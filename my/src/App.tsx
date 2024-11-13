import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import { Button } from "./components/ui/button";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaStarOfLife } from "react-icons/fa";

const App = () => {
  type Inputs = {
    name: string;
    price: number;
    image: string;
  };
  const [products, setProducts] = useState([]);
  const [productId, setCurrentProductId] = useState(0)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error:unknown) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [products]);
  const handleDelete = async (id:string) => {
    try {
         await axios.delete(
        `http://localhost:3000/api/products/${id}`
      );

    } catch (error) {
      console.log(error);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>();
  useEffect(() => {
    if (isSubmitSuccessful) {
      const timer = setTimeout(() => {
        reset();
      }, 3000);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [isSubmitSuccessful, reset]);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
     await axios.put(`http://localhost:3000/api/products/${productId}`, data);
      reset();
    } catch (error) {
      console.error("Error Updating product:", error);
    }
  };
  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-r from-[#000000] to-[#0A0903] text-white p-2">
        <Navbar />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mt-10">
          Current Products
        </h1>
        {!loading && products.length === 0 && (
          <div className=" mt-10  flex items-center justify-center place-items-center gap-2">
            <p className="text-3xl">No Products Yet</p>
            <Button asChild variant="secondary" className="mt-1">
              <Link to="/create">
                {" "}
                <FaPlus color="black" />
                Create
              </Link>
            </Button>
          </div>
        )}
        {loading && (
          <p className="text-center text-3xl text-orange-600 mt-20 flex flex-col justify-center items-center">
            <AiOutlineLoading3Quarters size={50} className="animate-spin" />
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4">
          {!loading &&
            products.length > 0 &&
            products.map(({ _id, name, image, price }) => {
              return (
                <div
                  key={_id}
                  className="flex  flex-col justify-center p-3 rounded-lg shadow-gray-100 shadow-md"
                >
                  <img
                    src={image}
                    alt={`image of ${name}`}
                    className="object-contain rounded-lg"
                  />
                  <h1 className="text-2xl mt-1 font-bold">{name}</h1>
                  <p>Price: ${price}</p>
                  <div className="flex gap-1 justify-center pt-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="text-black hover:text-white shadow-sm shadow-white"
                        >
                          <MdDelete />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete product from your account and remove it's
                            data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(_id)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-green-400 hover:bg-green-500 text-black hover:text-white hover:shadow-sm hover:shadow-white" onClick={()=>setCurrentProductId(_id)}>
                          <FaEdit />
                          Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogTitle>
                          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl mb-10">
                            Edit Product Details
                          </h1>
                        </DialogTitle>
                        <DialogDescription>
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                          className="flex flex-col gap-5"
                          >
                            {/* register your input into the hook by invoking the "register" function */}
                            <input
                              {...register("name", {
                                required: true,
                                minLength: 5,
                              
                              })}
                              className="outline-none px-3 py-1.5 rounded-md text-zinc-950 border-2 border-black"
                              placeholder="Edit Product Name"
                              defaultValue={name}
                              autoFocus
                            />
                            {errors.name && errors.name.type === "required" && (
                              <span
                                role="alert"
                                className="flex items-start gap-1 tracking-tight text-red-500  m-0 p-0 "
                              >
                                This field is required{" "}
                                <FaStarOfLife size={"7px"} className="mt-1" />
                              </span>
                            )}
                            {errors.name &&
                              errors.name.type === "minLength" && (
                                <span
                                  role="alert"
                                  className="tracking-tight text-red-500  m-0 p-0"
                                >
                                  product name is too short!
                                </span>
                              )}
                            {/* include validation with required or other standard HTML validation rules */}
                            <input
                              {...register("price", {
                                required: true,
                                pattern: {
                                  value: /^[1-9][0-9]*$/, // Regular expression for positive integers
                                  message:
                                    "Only positive integer values are allowed",
                                },
                              })}
                              className="outline-none px-3 py-1.5 rounded-md text-zinc-950 border-2 border-black"
                              placeholder="Edit Product Price"
                              defaultValue={price}
                            />
                            {errors.price &&
                              errors.price.type === "required" && (
                                <span
                                  role="alert"
                                  className="flex items-start gap-1 tracking-tight text-red-500  m-0 p-0 "
                                >
                                  This field is required{" "}
                                  <FaStarOfLife size={"7px"} className="mt-1" />
                                </span>
                              )}
                            {errors.price && (
                              <span className="tracking-tight text-red-500  m-0 p-0">
                                {errors.price.message}
                              </span>
                            )}
                            <input
                              {...register("image", { required: true })}
                              className="outline-none px-3 py-1.5 rounded-md text-zinc-950 border-2 border-black "
                              placeholder="Edit Product Image"
                              defaultValue={image}
                            />
                            {/* errors will return when field validation fails  */}
                            {errors.image && (
                              <span
                                role="alert"
                                className="flex items-start gap-1 tracking-tight text-red-500 m-0 p-0  "
                              >
                                This field is required{" "}
                                <FaStarOfLife size={"7px"} className="mt-1" />
                              </span>
                            )}

                            <Button
                              type="submit"
                              className="font-extrabold"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Updating..." : "Update"}
                            </Button>
                            {isSubmitSuccessful && (
                              <span className="tracking-tight text-green-500  m-0 p-0 text-center">
                                Updated Successfully!
                              </span>
                            )}
                          </form>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default App;
