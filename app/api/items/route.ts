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
function findItemGET(id: string): ItemData | undefined {
  return items.find((item: ItemData) => item.id === id);
}

// App Router uses 'request: NextRequest', not (req, res)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (id) {
    const item = findItemGET(id);

    if (!item) {
      return NextResponse.json({ message: "Item not Found" }, { status: 404 });
    } else {
      return NextResponse.json(item, { status: 200 });
    }
  }

  // Return all items
  return NextResponse.json(items, { status: 200 });
}

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { title:string, description:string, price:number, category:string } = body;

//     let lastitem = items.reduce((max,curr) =>
//       curr.id > max.id ? curr:max
//     )

//     let newitem = {
//       id: lastitem.id + 1,
//       title: title,
//       description: description,
//       price: price,
//       category: category
//     }

//     items.push(newitem)

//   } catch(e) {
//     console.log(e);
//   }
// }

export async function PATCH(request: NextRequest) {
  try {
  const body = await request.json();
  const { id, title, description, price, category} = body;

  if (id && title && description && price && category) {
    items[id-1].title = title;
    items[id-1].description = description;
    items[id-1].price = price;
    items[id-1].category = category;
    console.log(items[id].title)
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
