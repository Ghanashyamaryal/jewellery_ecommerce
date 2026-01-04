"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { clearCart, selectCartItems } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import validationSchema from "@/components/common/ValidationSchema";
import { useToast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout/Layout";

export default function Checkout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const cartItems = useAppSelector(selectCartItems);

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<{
    orderNumber: string;
    orderId: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setOrderError("");

    try {
      const orderPayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        subtotal,
        tax,
        shipping,
        total,
        items: cartItems.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to place order");
      }

      setOrderSuccess({
        orderNumber: result.orderNumber,
        orderId: result.orderId,
      });

      setShowModal(true);

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${result.orderNumber} has been confirmed.`,
      });
    } catch (error: any) {
      const message =
        error.message || "An error occurred while placing your order";
      setOrderError(message);

      toast({
        title: "Order Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0 && !showModal) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 bg-background flex items-center justify-center">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">
                Add some products before checkout!
              </p>
              <Link href="/shop">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </div>
          </main>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex flex-col mx-auto max-w-[1500px] w-full">
        <main className="flex-1 bg-background">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                              <Input {...field} type="email" />
                            )}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="phoneNumber">Phone Number</Label>
                          <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                          />
                          {errors.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.phoneNumber.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Controller
                          name="address"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Controller
                            name="city"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Controller
                            name="state"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                          />
                          {errors.state && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.state.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Controller
                            name="zip"
                            control={control}
                            render={({ field }) => <Input {...field} />}
                          />
                          {errors.zip && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.zip.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          id="cod"
                          name="cod"
                          className="h-5 w-5 border-gray-300 rounded-sm"
                          required
                        />
                        <label htmlFor="cod" className="text-sm font-medium">
                          I agree to pay Cash on Delivery
                        </label>
                      </div>
                      <p className="text-muted-foreground text-sm mt-2">
                        You will be required to pay the total amount when the
                        order is delivered to your address.
                      </p>
                    </CardContent>
                  </Card>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>

                  {orderError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-700">{orderError}</p>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {cartItems.map((item, index) => (
                          <div
                            key={`${item.product.id}-${index}`}
                            className="flex justify-between text-sm"
                          >
                            <div className="flex-1">
                              <p className="font-medium">{item.product.name}</p>
                              <div className="space-y-0.5">
                                <p className="text-muted-foreground text-xs">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="font-medium ml-2">
                              Rs.{" "}
                              {(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span className="font-medium">
                            Rs. {subtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Shipping
                          </span>
                          <span className="font-medium text-green-600">
                            FREE
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span className="font-medium">
                            Rs. {tax.toFixed(2)}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span>Rs. {total.toFixed(2)}</span>
                        </div>
                      </div>

                      <Link href="/shop">
                        <Button
                          variant="outline"
                          className="w-full"
                          disabled={isLoading}
                          type="button"
                        >
                          Back to shopping
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </main>

        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Order Confirmed!
                </h2>
                <p className="text-gray-600 mb-4">
                  Your order has been placed successfully.
                </p>
                {orderSuccess && (
                  <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Order Number:</span>{" "}
                      {orderSuccess.orderNumber}
                    </p>
                  </div>
                )}
                <p className="text-gray-600 text-sm mb-6">
                  You will receive an email confirmation shortly. Our team will
                  contact you soon with shipping details.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      setShowModal(false);
                      dispatch(clearCart());
                      router.push("/");
                    }}
                    className="w-full"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
