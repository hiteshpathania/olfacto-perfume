import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    // Razorpay requires the raw body string to calculate the signature
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
    }

    // Verify the signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (expectedSignature === signature) {
      const event = JSON.parse(body);

      // Handle the successful payment event
      if (event.event === 'payment.captured') {
        const paymentData = event.payload.payment.entity;
        
        // TODO: Add your logic here (e.g., save order to database, send email)
        console.log("Payment successfully captured for:", paymentData.id);
      }

      // You must return a 200 OK so Razorpay knows you received it
      return NextResponse.json({ status: 'ok' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}