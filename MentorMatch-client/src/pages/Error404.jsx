import React from 'react'

import { Link } from 'react-router'
import Helmet from 'react-helmet'

const Error404 = () => {
    return (
        <div className='w-11/12 mx-auto my-10 flex flex-col justify-center items-center gap-4'>
            <Helmet>
                <title>error page</title>
            </Helmet>
            <div className='w-2/3'>
                <img src="https://media.licdn.com/dms/image/v2/C5112AQEw1fXuabCTyQ/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1581099611064?e=1752710400&v=beta&t=K6ALXS1WaejuNyED3ks-9kYYbayuFShIkxC3FgUOkPw" alt="" />
            </div>
            <Link to="/" className='text-center underline'>Go back to Home</Link>
        </div>
    )
}

export default Error404