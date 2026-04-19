// app/actions/save-lead.ts
'use server';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { headers } from 'next/headers';

import { TFormSchema } from '@/lib/form-schema';
import { firebaseDB } from '@/services/Firebase.service';

// Type for ipwho.is response
interface IPWhoisResponse {
  ip: string;
  success: boolean;
  type?: string;
  continent?: string;
  continentCode?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionCode?: string;
  city?: string;
  district?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  offset?: number;
  currency?: string;
  isp?: string;
  org?: string;
  as?: string;
  asname?: string;
  reverse?: string;
  mobile?: boolean;
  proxy?: boolean;
  hosting?: boolean;
}

// Helper: Extract real IP from headers (handles proxies, Cloudflare, etc.)
const getClientIP = async (): Promise<string | null> => {
  // ✅ Await headers() in Next.js 15+
  const headersList = await headers();

  const ipHeaders = [
    'cf-connecting-ip',
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'true-client-ip',
  ];

  for (const header of ipHeaders) {
    const value = headersList.get(header);
    if (value) {
      const ip = value.split(',')[0].trim();
      if (ip && ip !== 'unknown') return ip;
    }
  }

  return headersList.get('x-forwarded-for')?.split(',')[0].trim() || null;
};

// Helper: Fetch location data from ipwho.is
const fetchLocationData = async (
  ip: string
): Promise<Partial<IPWhoisResponse> | null> => {
  try {
    // Skip lookup for localhost/private IPs
    if (
      ip.startsWith('127.') ||
      ip.startsWith('192.168.') ||
      ip.startsWith('10.')
    ) {
      // ✅ Return only fields that match the interface
      return {
        ip,
        country: 'Local Network',
        city: 'localhost',
      };
    }

    const response = await fetch(`https://ipwho.is/${ip}`, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      console.warn(`ipwho.is API error: ${response.status}`);
      return null;
    }

    // ✅ Fix: Correct variable name & type annotation
    const data: IPWhoisResponse = await response.json();

    if (!data.success) {
      console.warn(`ipwho.is lookup failed for IP ${ip}`);
      return null;
    }

    return {
      ip: data.ip,
      country: data.country,
      countryCode: data.countryCode,
      region: data.region,
      city: data.city,
      zip: data.zip,
      lat: data.lat,
      lon: data.lon,
      timezone: data.timezone,
      isp: data.isp,
      proxy: data.proxy,
      hosting: data.hosting,
    };
  } catch (error) {
    console.error('Geolocation lookup failed:', error);
    return null;
  }
};

export const saveLeadAction = async ({
  email,
  message,
  contactNo, // ✅ Destructure the new optional field
}: TFormSchema) => {
  try {
    // Server-side validation
    if (!email?.trim() || !message?.trim()) {
      return { error: 'Email and message are required' };
    }

    const clientIP = await getClientIP();
    const locationData = clientIP ? await fetchLocationData(clientIP) : null;

    const leadsRef = collection(firebaseDB, 'Portfolio-leads');

    await addDoc(leadsRef, {
      email: email.trim(),
      message: message.trim(),
      contactNo: contactNo?.trim() || null, // ✅ Save contactNo (null if empty)
      submittedAt: serverTimestamp(),
      status: 'new',

      // Network & location metadata
      ipAddress: clientIP || null,
      location: locationData || null,
    });

    return {
      data: 'Thank you! Your message has been received.',
    };
  } catch (error) {
    console.error('Firestore save error:', error);
    return { error: 'Failed to save your message. Please try again.' };
  }
};
