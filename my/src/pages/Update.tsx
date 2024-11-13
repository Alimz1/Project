
import Navbar from "@/components/Navbar"
import { useForm, SubmitHandler } from "react-hook-form";
import { FaStarOfLife } from "react-icons/fa";
import axios from 'axios'
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type Inputs = {
  name: string;
  price: number;
  image: string;
};
const Update = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,isSubmitting,isSubmitSuccessful },
} = useForm<Inputs>();
useEffect(() => {
    if (isSubmitSuccessful) {
      const timer = setTimeout(() => {
        reset()
      }, 3000);

      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [isSubmitSuccessful,reset]);
const onSubmit: SubmitHandler<Inputs> = async(data) => {
try {
    await axios.put('http://localhost:3000/api/products',data)

   reset();
   
} catch (error) {
    console.error('Error Updating product:', error);
    
}
}
  return (
    <div className="w-full h-screen bg-gradient-to-r from-[#000000] to-[#0A0903] text-white p-2">
        <Navbar/>
        <div className="w-full h-5/6 flex justify-center items-center  ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-2/6"
        >
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-10">
            Update Product
          </h1>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            {...register("name", { required: true, minLength: 5 })}
            className="outline-none px-3 py-1.5 rounded-md text-zinc-950"
            placeholder="Enter Product Name"
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
          {errors.name && errors.name.type === "minLength" && (
            <span role="alert" className="tracking-tight text-red-500  m-0 p-0">
              product name is too short!
            </span>
          )}
          {/* include validation with required or other standard HTML validation rules */}
          <input
            {...register("price", {
              required: true,
              pattern: {
                value: /^[1-9][0-9]*$/, // Regular expression for positive integers
                message: "Only positive integer values are allowed",
              },
            })}
            className="outline-none px-3 py-1.5 rounded-md text-zinc-950"
            placeholder="Enter Product Price"
          />
          {errors.price && errors.price.type === "required" && (
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
            className="outline-none px-3 py-1.5 rounded-md text-zinc-950 "
            placeholder="Product Image"
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

          <Button type="submit" className="font-extrabold" disabled={isSubmitting} >
            {isSubmitting? "Adding...": "Add New Product"}
          </Button>
          {isSubmitSuccessful &&  (
            <span className="tracking-tight text-green-500  m-0 p-0 text-center">
              Product Updated successfully!
            </span>
          )}
        </form>
      </div>
    </div>
  )
}

export default Update