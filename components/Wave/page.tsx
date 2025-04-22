import React from 'react';
import Image from 'next/image';

const Wave: React.FC = () => {
    return (
        <div className="w-full relative">
            <div className="w-full">
                <Image
                    src="/images/Background/Wave.svg"
                    alt="Wave separator"
                    width={1920}
                    height={200}
                    className="w-full object-cover"
                    priority
                />
            </div>
        </div>
    );
};

export default Wave;