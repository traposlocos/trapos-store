"use client";
import * as React from "react";
import { UploadButton } from "../../utils/uploadthing";
import Image from "next/image";
import { uploadProduct } from "../../utils/product";
import Checkbox from "../Checkbox";

export type Product = {
  name?: string;
  description?: string;
  price?: number;
  size?: string[];
  color?: string[];
  type?: string;
  img: Array<string>;
  _id?: string;
};
export type InputEvents =
  | React.FormEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLSelectElement>;

export default function Uploads() {
  const [product, setProduct] = React.useState<Product>({
    name: "",
    description: "",
    price: 0,
    color: [],
    size: [],
    type: "",
    img: [],
  });
  const [error, setError] = React.useState<boolean>(false);
  const [imgDone, setImgDone] = React.useState<boolean>(false);
  const [uploaded, setUploaded] = React.useState<boolean>(false);

  console.log(product);

  const validateFields = () => {
    const { name, price, type, img } = product;
    if (name == "" || price == 0 || type == "" || img!.length == 0) {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };
  const resetProduct = () => {
    setProduct({
      name: "",
      description: "",
      price: 0,
      color: [],
      size: [],
      type: "",
      img: [],
    });
  };
  const updateProduct = (e: InputEvents) => {
    setProduct({ ...product, [e.currentTarget.name]: e.currentTarget.value });
  };

  const inputStyles =
    "text-black rounded p-2 focus:outline-none focus:ring focus:ring-green-700 mb-2";

  return (
    <div className="flex flex-col text-white justify-center items-center p-8">
      {!uploaded ? (
        <>
          {!imgDone && (
            <>
              {!product.img.length ? (
                <h3 className="text-2xl mb-4 ">
                  Selecciona la imagen del producto
                </h3>
              ) : (
                <h3 className="text-2xl mb-4 ">Subir mas imágenes</h3>
              )}

              <UploadButton
                content={{
                  button({ ready }) {
                    if (ready) {
                      return <div>Subir imagen</div>;
                    }
                  },
                  allowedContent({ isUploading }) {
                    if (isUploading) return "Subiendo archivo...";
                  },
                }}
                className=""
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  const url: string = res![0].url;
                  setProduct({
                    ...product,
                    img: [...product.img, url],
                  });
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
              {
                <div className="flex flex-col justify-center items-center">
                  <p>Imágenes del producto: {product.img.length}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setImgDone(true);
                    }}
                    className="text-2xl border-2 p-2 border-white rounded text-center m-2"
                  >
                    Siguiente
                  </button>
                </div>
              }
            </>
          )}
          {/* If image is uploaded, ask if more images or load rest of form */}
          {product.img.length > 0 && imgDone && (
            <div className="flex text-xl mb-20 flex-col items-center justify-center gap-4">
              <Image
                width={150}
                height={200}
                className="h-auto"
                src={product.img[0]}
                alt="uploaded image"
              ></Image>
              <form className="flex flex-col justify-center">
                <label htmlFor="name" className="mb-1">
                  Nombre del producto:
                </label>
                <input
                  onChange={(e) => {
                    updateProduct(e);
                  }}
                  className="text-black rounded p-2 focus:outline-none focus:ring focus:ring-green-700 mb-2"
                  placeholder="Camiseta One Piece"
                  type="text"
                  name="name"
                ></input>
                <label htmlFor="price" className="mb-1">
                  Precio:
                </label>
                <input
                  onChange={(e) => {
                    updateProduct(e);
                  }}
                  placeholder="400"
                  type="number"
                  name="price"
                  className={`${inputStyles} w-auto`}
                ></input>
                <label>Colores disponibles:</label>
                <ul>
                  <li>
                    <Checkbox color="#22c55e">Azul</Checkbox>
                  </li>
                </ul>
                <label htmlFor="description" className="mb-1">
                  Descripción:
                </label>
                <textarea
                  onChange={(e) => {
                    updateProduct(e);
                  }}
                  maxLength={120}
                  placeholder="Describe el producto brevemente"
                  className={`${inputStyles}`}
                  name="description"
                ></textarea>
                <label htmlFor="category" className="mb-1">
                  Categoría:
                </label>
                <select
                  onChange={(e) => {
                    updateProduct(e);
                  }}
                  className={inputStyles}
                  name="type"
                >
                  <option value="">--Elige categoría--</option>
                  <option value="camisetas">Camisetas</option>
                  <option value="canguros">Canguros</option>
                  <option value="gorras">Gorras</option>
                  <option value="tazas">Tazas</option>
                </select>
                {error && (
                  <span className="text-red-400">
                    Asegurate de completar todos los campos
                  </span>
                )}
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    const validFields = validateFields();
                    if (validFields) {
                      const { name, price, description, type, img } = product;
                      await uploadProduct({
                        name: name,
                        price: Number(price),
                        description: description,
                        type: type,
                        img: img,
                      });
                      setUploaded(true);
                    }
                  }}
                  className="bg-white text-black text-center leading-5 text-2xl rounded w-[120px]
               h-[40px] mt-4 self-center p-2 hover:bg-green-200 active:scale-105"
                >
                  Agregar
                </button>
              </form>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={() => {
            resetProduct();
            setUploaded(false);
            setImgDone(false);
          }}
          className="bg-white text-black text-xl p-2 rounded"
        >
          Subir otro producto
        </button>
      )}
    </div>
  );
}
