import { signIn } from "../../../../auth";

export default function AdminLoginPage(){
    async function handleLogin(formData: FormData) {
        "use server"; //server action

        await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/admin"
        })
    }
    
    return(
        <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-50 px-6 py-12">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Login</h1>

                    <p className="mt-2 text-gray-600">Sign in to manage your joseblogs content</p>
                </div>

                <form action={handleLogin} className="space-y-5">
                    <div>
                        <label 
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email" 
                            type="email" 
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-950 outline-none 
                                focus:border-gray-600 focus:border-2"
                        />
                    </div>

                    <div>
                        <label 
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="password"
                            name="password" 
                            type="password" 
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-950 outline-none 
                                focus:border-gray-600 focus:border-2"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition-colors hover:bg-gray-800 cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">JoseBlogs Admin Panel</p>
            </div>
        </main>
    );
}