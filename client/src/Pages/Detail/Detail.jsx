import { Button } from '@/components/ui/button'
import React from 'react'
import Thumbnail from '../../assets/blog22.jpg'

const Detail = () => {
    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6 flex flex-col min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Topic Title</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                        Delete
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <p className="text-gray-500 dark:text-gray-400">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, vitae incidunt. At ullam illum dolorem! Itaque voluptate aut, aperiam consectetur in explicabo fuga ratione nobis cupiditate corrupti nesciunt assumenda porro sunt, repudiandae tenetur, maxime obcaecati! Modi fugiat error aperiam dolorem expedita impedit, ad, a, velit quisquam sit officiis architecto. Perspiciatis alias odio repellendus minima laudantium suscipit voluptates numquam ratione magnam fugiat assumenda reiciendis explicabo placeat sequi earum aliquam accusamus eveniet accusantium quae, vitae harum quam provident. Cupiditate enim labore, doloribus fuga cum ullam, architecto soluta temporibus officiis sint quas nihil laudantium nesciunt optio expedita fugit eligendi, eum ratione at ipsam sequi minima. Aliquid praesentium commodi quasi, harum maxime voluptas ex facere, nihil dolorem quas quidem nam eius necessitatibus quae, ducimus tempore obcaecati voluptates ipsum temporibus rerum illo consequatur. Dolorem quibusdam quo molestiae commodi fugit eligendi omnis in harum illo possimus, delectus nihil ea eveniet, error nesciunt ipsum saepe fugiat totam. Aliquid cupiditate consectetur ad sapiente error assumenda esse deserunt velit explicabo, delectus quisquam temporibus doloribus sunt mollitia vero quos quia! Nihil minima dolorum veniam ipsa ratione unde quam quia sint, ipsam quis natus ipsum. A nesciunt iure cupiditate ipsam, eaque placeat debitis doloremque veritatis aut ipsum quos fugit praesentium facere minus, ab labore illo nisi vitae. Ab harum incidunt ipsum quo totam voluptatum. Possimus nostrum aspernatur temporibus, ratione explicabo quasi veritatis? Cupiditate pariatur consequuntur voluptates dolore adipisci corporis, sequi odit atque, voluptate dignissimos dolores iste labore? Molestias excepturi ut porro quia similique accusantium, doloremque dignissimos voluptatibus officia, perspiciatis sequi vitae esse recusandae. Non quo eveniet adipisci, atque officia itaque natus magnam quidem, dignissimos eligendi nesciunt. Laborum ducimus voluptates numquam. Maiores quae assumenda harum nisi, ipsam rem iure ea? Hic obcaecati laborum, dolorem ipsa harum expedita quidem? Aliquam odit dolor deleniti veniam qui, architecto, sequi officiis quis perspiciatis nesciunt voluptates vero repellat vel voluptate tempora molestiae quos, harum sint recusandae rem ad illum amet voluptatibus corporis? Voluptates culpa tempore odit facere, dolorum unde pariatur neque saepe quidem cupiditate, esse, ipsum itaque earum. Inventore iste commodi, similique quo atque corporis saepe doloremque omnis ea, quibusdam ipsum earum vero voluptatem suscipit, eveniet quaerat?
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <img src={Thumbnail} width={300} height={200} alt="Image 1" className="rounded-lg overflow-hidden" />
                        <img src={Thumbnail} width={300} height={200} alt="Image 2" className="rounded-lg overflow-hidden" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img src={Thumbnail} width={300} height={200} alt="Image 3" className="rounded-lg overflow-hidden" />
                        <img src={Thumbnail} width={300} height={200} alt="Image 4" className="rounded-lg overflow-hidden" />
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-gray-500 dark:text-gray-400 mb-1">Created</div>
                            <div className="font-medium">2023-04-15</div>
                        </div>
                        <div>
                            <div className="text-gray-500 dark:text-gray-400 mb-1">Updated</div>
                            <div className="font-medium">2023-05-20</div>
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500 dark:text-gray-400 mb-1">Category</div>
                        <div className="font-medium">Technology</div>
                    </div>
                    <div>
                        <div className="text-gray-500 dark:text-gray-400 mb-1">Tags</div>
                        <div className="font-medium">
                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md mr-2">Tag 1</span>
                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md mr-2">Tag 2</span>
                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md mr-2">Tag 3</span>
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500 dark:text-gray-400 mb-1">Author</div>
                        <div className="font-medium">John Doe</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail