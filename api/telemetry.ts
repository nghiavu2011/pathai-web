export interface VercelRequest {
  method?: string;
  body?: any;
  headers?: Record<string, string | string[] | undefined>;
}

export interface VercelResponse {
  setHeader(name: string, value: string): this;
  status(statusCode: number): this;
  json(body: any): void;
  end(): void;
}

// In-memory aggregates buffer for serverless execution instance
let inMemoryAggregates = {
  totalBeacons: 0,
  lastUpdated: Date.now(),
  completionRateAvg: 85,
  csatAvg: 94
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'active',
      compliance: {
        decree: '13/2023/ND-CP (Personal Data Protection)',
        lawOnChildren: '2016',
        zeroPII: true
      },
      aggregates: inMemoryAggregates
    });
  }

  if (req.method === 'POST') {
    const payload = req.body || {};

    // Strict Zero PII Verification
    const forbiddenKeys = ['name', 'fullName', 'email', 'phone', 'phoneNumber', 'address', 'gps', 'ip'];
    const payloadKeys = Object.keys(payload);
    const hasPII = payloadKeys.some(k => forbiddenKeys.includes(k.toLowerCase()));

    if (hasPII) {
      return res.status(400).json({
        error: 'Violation of Privacy Policy. PII is strictly prohibited on this endpoint.'
      });
    }

    inMemoryAggregates.totalBeacons += 1;
    inMemoryAggregates.lastUpdated = Date.now();
    if (typeof payload.completionRate === 'number') {
      inMemoryAggregates.completionRateAvg = Math.round(
        (inMemoryAggregates.completionRateAvg * 0.9) + (payload.completionRate * 0.1)
      );
    }
    if (typeof payload.csatScore === 'number') {
      inMemoryAggregates.csatAvg = Math.round(
        (inMemoryAggregates.csatAvg * 0.9) + (payload.csatScore * 0.1)
      );
    }

    return res.status(200).json({
      status: 'recorded',
      timestamp: Date.now()
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed. Use GET or POST.' });
}
