import React from 'react'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

const ErrorPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">404</h1>
                    <p className="text-lg">Page not found</p>

                    <div className="mt-6">
                        <a href="/" className="text-blue-500 hover:underline">Go back home</a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ErrorPage