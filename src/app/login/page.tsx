import Link from "next/link";
import { Leaf, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-sage-700 p-12 text-white lg:flex grain-bg">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <Leaf className="h-6 w-6" />
          </div>
          <span className="font-display text-2xl font-bold">FoodFlow</span>
        </div>

        <div>
          <h1 className="font-display text-4xl font-bold leading-tight">
            From pantry to plate —
            <br />
            inventory that thinks ahead.
          </h1>
          <p className="mt-4 max-w-md text-lg text-sage-100">
            Less waste. Smarter orders. Healthier margins. Built for restaurants
            that care about every ingredient.
          </p>
        </div>

        <p className="text-sm text-sage-200">
          Trusted by 200+ kitchens worldwide
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center bg-cream p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-600 text-white">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold text-charcoal">
                FoodFlow
              </span>
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold text-charcoal">
            Welcome back
          </h2>
          <p className="mt-1 text-stone-500">Sign in to Bella Verde Kitchen</p>

          <form className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-medium text-stone-600">Email</label>
              <input
                type="email"
                defaultValue="marco@bellaverde.com"
                className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-charcoal outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-stone-600">Password</label>
              <input
                type="password"
                defaultValue="demo1234"
                className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-charcoal outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100"
              />
            </div>
            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-sage-600 py-3 text-sm font-medium text-white transition hover:bg-sage-700"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </Link>
          </form>

          <p className="mt-6 text-center text-xs text-stone-400">
            Demo mode — click Sign In to explore the dashboard
          </p>
        </div>
      </div>
    </div>
  );
}
