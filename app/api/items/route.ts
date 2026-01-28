import { NextRequest, NextResponse } from "next/server";
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

interface CreateItemADD {
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}


function findItemIndex(id: string): number {
  return items.findIndex((item: ItemData) => item.id === id);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (id) {
    const item = items.find((item) => item.id === id);

    if (!item) {
      return NextResponse.json({ message: "Item not Found" }, { status: 404 });
    } else {
      return NextResponse.json(item, { status: 200 });
    }
  }

  return NextResponse.json(items, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateItemADD = await request.json();
    const { title, description, price, category, image } = body;

    if (!title || !description || price == null || !category) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const maxId =
      items.length > 0 ? Math.max(...items.map((i) => Number(i.id))) : 0;

    const newId: string = String(maxId + 1);

    let newitem = {
      id: newId,
      title: title,
      description: description,
      price: Number(price),
      category: category,
      createdAt: new Date().toISOString(),
      image: image || undefined,
    };

    items.push(newitem);

    return NextResponse.json(
      { message: "Item created successfully", item: newitem },
      { status: 201 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Invalid JSON or server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, price, category, image } = body;

    const index = findItemIndex(String(id));

    if (id && title && description && price && category) {
      items[index].title = title;
      items[index].description = description;
      items[index].price = price;
      items[index].category = category;
      
      if (image !== undefined) {
        items[index].image = image || undefined;
      }

      return NextResponse.json({ message: "Item Updated" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Data Mismatch from database" },
        { status: 404 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Error Processing Req" },
      { status: 500 },
    );
  }
}