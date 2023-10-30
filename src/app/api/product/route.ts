import Product, { ProductModel } from "../../models/product";
import { Product as ProdType } from "@/app/Components/Dashboard/ProductUploads";
import Error from "next/error";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);

  try {
    const { name, price, type, description, img } = body;
    const prod: ProductModel = new Product({
      name: name,
      price: price,
      type: type,
      description: description,
      img: img,
    });
    const savedProd = await prod.save();
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json("producto agregado");
}

export async function PUT(req: NextRequest) {
  const body: ProdType = await req.json();
  const params = req.nextUrl.searchParams;
  const id = params.get("id");

  console.log(body);
  console.log(id);

  try {
    const { name, price, type, description, img } = body;
    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    console.log(err);
  }

  return Response.json("producto editado");
}

// Add and export another function for each request method (GET, PUT)
