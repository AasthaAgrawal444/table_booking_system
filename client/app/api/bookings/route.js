import { NextResponse } from 'next/server';

let bookings = [];

export async function GET() {
  return NextResponse.json(bookings);
}

export async function POST(request) {
  const newBooking = await request.json();
  bookings.push(newBooking);
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  const { id } = await request.json();
  bookings = bookings.filter((booking) => booking.id !== id);
  return NextResponse.json({ success: true });
}
