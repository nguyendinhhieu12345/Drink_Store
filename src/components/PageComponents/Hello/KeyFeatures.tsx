import { BellSimpleRinging, CreditCard, UsersThree } from '@phosphor-icons/react';
import React, { ReactNode } from 'react';

const Key_Features = [
    {
        icon: <UsersThree size={24} />,
        title: "Everyone can add",
        description: "Your friends can join via their phones or online to add expenses and check their balances."
    },
    {
        icon: <BellSimpleRinging size={24} />,
        title: "Get notified",
        description: "Receive immediate updates whenever your friends add, edit or delete shared expenses."
    },
    {
        icon: <CreditCard size={24} />,
        title: "Use multiple currencies",
        description: "Convert every purchase to one currency, no matter where you go, for transparency across all your accounts."
    },
]

const KeyFeatures: React.FC = () => {

    return (
        <div className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-lg text-gray-800 font-semibold tracking-wide uppercase">Key features</h2>
                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            {Key_Features.map((fea, index) => (
                                <div className="flex" key={index}>
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white">
                                            {fea?.icon as ReactNode}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <dt className="text-lg leading-6 font-medium text-gray-900">{fea?.title}</dt>
                                        <dd className="mt-2 text-base text-gray-500">{fea?.description}</dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeyFeatures;