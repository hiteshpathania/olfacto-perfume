import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    // Validate amount >= 100 paise (₹1)
    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Minimum amount must be 100 paise" }, { status: 400 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_KEY_SECRET as string,
    });

    const options = {
      amount: amount, // FIXED: Removed the * 100 here
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order, { status: 200 });
    
  } catch (error: any) {
    console.error("Razorpay Error:", error);
    if (error.statusCode === 401) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }
    return NextResponse.json({ error: "Error creating order" }, { status: 500 });
  }
}