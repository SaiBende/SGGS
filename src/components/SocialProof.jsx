import React from 'react'

function SocialProof() {
    return (
        <>
            <section className="bg-white dark:bg-gray-900">
            <h2 className="text-3xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl xl:text-3xl dark:text-white p-2">
            Adopted and loved by millions of users for over a decade
                </h2>
                <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                    <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">73M+</dt>
                            <dd className="font-light text-gray-500 dark:text-gray-400">developers</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">1B+</dt>
                            <dd className="font-light text-gray-500 dark:text-gray-400">contributors</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">4M+</dt>
                            <dd className="font-light text-gray-500 dark:text-gray-400">organizations</dd>
                        </div>
                    </dl>
                </div>
            </section>
        </>
    )
}

export default SocialProof