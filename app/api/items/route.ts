import { NextRequest, NextResponse } from "next/server";
// Assuming this path is correct based on your snippet
import { items } from "../../../lib/itemsStore";

interface ItemData {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  image?: string;
}

// Helper function
function findItem(id: string): ItemData | undefined {
  return items.find((item: ItemData) => item.id === id);
}

// App Router uses 'request: NextRequest', not (req, res)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (id) {
    const item = findItem(id);

    if (!item) {
      return NextResponse.json({ message: "Item not Found" }, { status: 404 });
    } else {
      return NextResponse.json(item, { status: 200 });
    }
  }

  // Return all items
  return NextResponse.json(items, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
  const body = await request.json();
  const { id, title, description } = body;

  if (id && title && description) {
    let item = findItem(id);
    items[id].title = title;
    items[id].description = description;
    return NextResponse.json({message: "Item Updated"},{status:200})
  }
  else {
    return NextResponse.json({message: "Data Mismatch from data base"},{status:404})
  } }
  catch (err) {
    return NextResponse.json(
      {message: "Error Processing Req"},
      {status:500}
    )
  }
}
