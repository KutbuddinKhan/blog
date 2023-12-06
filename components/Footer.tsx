import { DiscordLogoIcon, GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import React from 'react';

export default function Footer() {
    return (
        <footer className='border-t py-10'>
            <div className="max-w-7xl py-10 px-5 md:p-0 scale-y-5 mx-auto flex justify-between md:items-end flex-col md:flex-row">
                <div className="space-y-10">
                    <div className="space-y-2 w-full sm:w-96">
                        <h1 className="text-3xl font-bold">
                            Daily Blog
                        </h1>
                        <p className="text-gray-500">
                            Explore a world of captivating stories and insightful articles on our blog. From the latest trends to in-depth analyses, our blog covers a wide range of topics to keep you informed and entertained. Join our community of readers and discover thought-provoking content that sparks curiosity and fosters discussion. Stay updated with our diverse collection of blog posts, written by passionate contributors who share their expertise and unique perspectives. Engage with a platform that goes beyond the ordinary, providing you with enriching content that resonates with your interests.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <a href="https://github.com/KutbuddinKhan" target="_blank" rel="noopener noreferrer">
                            <GitHubLogoIcon className='h-5 w-5 cursor-pointer' />
                        </a>
                        <a href="https://www.linkedin.com/in/khan-kutbuddin-839a741bb/" target="_blank" rel="noopener noreferrer">
                            <LinkedInLogoIcon className='h-5 w-5 cursor-pointer' />
                        </a>
                        {/* <DiscordLogoIcon className='h-5 w-5 cursor-pointer' /> */}
                    </div>
                </div>
                <h1 className="text-gray-500">
                    &copy; 2023 Kutbuddin Khan. All rights reserved.
                </h1>
            </div>
        </footer>
    );
}
