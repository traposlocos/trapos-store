import product from "../models/product";
import connectDb from "./db";

const api = {
  product: {
    list: async (cat: string) => {
      await connectDb();
      try {
        let prods;
        if (cat === "todos") {
          prods = await product.find({}).lean().exec();
        } else {
          prods = await product.find({ type: cat }).lean().exec();
        }
        return {
          prods: prods.map(
            ({
              name,
              color,
              type,
              subType,
              kidSize,
              size,
              price,
              description,
              img,
            }) => ({
              name,
              color,
              type,
              subType,
              kidSize,
              size,
              price,
              description,
              img,
            })
          ),
        };
      } catch (err: any) {
        console.log(
          "this is the error =>",
          err,
          err?.message!,
          err?.status!,
          err?.toString()
        );
        throw new Error("Fetching data failed");
      }
    },
  },
};
export default api;
