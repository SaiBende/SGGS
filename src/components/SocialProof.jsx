import React from 'react'

function SocialProof() {
    return (
        <>
            <section class="bg-white dark:bg-gray-900">
            <h2 className="text-3xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl xl:text-3xl dark:text-white p-2">
            Adopted and loved by millions of users for over a decade
                </h2>
                <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                    <dl class="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
                        <div class="flex flex-col items-center justify-center">
                            <dt class="mb-2 text-3xl md:text-4xl font-extrabold">73M+</dt>
                            <dd class="font-light text-gray-500 dark:text-gray-400">developers</dd>
                        </div>
                        <div class="flex flex-col items-center justify-center">
                            <dt class="mb-2 text-3xl md:text-4xl font-extrabold">1B+</dt>
                            <dd class="font-light text-gray-500 dark:text-gray-400">contributors</dd>
                        </div>
                        <div class="flex flex-col items-center justify-center">
                            <dt class="mb-2 text-3xl md:text-4xl font-extrabold">4M+</dt>
                            <dd class="font-light text-gray-500 dark:text-gray-400">organizations</dd>
                        </div>
                    </dl>
                </div>
            </section>
        </>
    )
}

export default SocialProof