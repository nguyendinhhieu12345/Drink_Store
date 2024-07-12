import assets from '@/assets';
import React from 'react';

const Tricount: React.FC = () => {
    const openApp = () => {
        const appUrlScheme = 'myapp://'; // Deep link URL scheme của ứng dụng của bạn
        const appStoreUrl = 'https://apps.apple.com/app/id1234567890'; // URL tới App Store của ứng dụng của bạn
        const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.myapp'; // URL tới Play Store của ứng dụng của bạn
        const windowsStoreUrl = 'ms-windows-store://pdp/?productid=9WZDNCRFJ3TJ'; // URL tới Microsoft Store của ứng dụng của bạn
        const macStoreUrl = 'macappstore://itunes.apple.com/app/id1234567890'; // URL tới Mac App Store của ứng dụng của bạn

        const userAgent = navigator.userAgent || navigator.vendor;

        // Kiểm tra nếu là thiết bị iOS
        if (/iPad|iPhone|iPod/.test(userAgent)) {
            window.location.href = appUrlScheme;
            setTimeout(() => {
                window.location.href = appStoreUrl;
            }, 2000);
        } else if (/android/i.test(userAgent)) {
            window.location.href = appUrlScheme;
            setTimeout(() => {
                window.location.href = playStoreUrl;
            }, 2000);
        } else if (/Win/.test(userAgent)) {
            window.location.href = windowsStoreUrl;
        } else if (/Mac/.test(userAgent)) {
            window.location.href = macStoreUrl;
        } else {
            alert('Deep linking is not supported on this device.');
        }
    };

    return (
        <div className="bg-white border-b border-gray-300 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        BECOME A MEMBER OF SHOPFEE
                    </h2>
                </div>
                <div className="mt-8 sm:flex sm:items-center sm:justify-center">
                    <div className='w-full sm:w-1/2'>
                        <img src={assets?.images?.download_app} alt="Coffee House App" className="h-auto w-auto" />
                    </div>
                    <div className="w-full mt-4 text-center sm:w-1/2 sm:-mt-6">
                        <p className="mt-5 text-lg text-gray-600">
                            <span className='text-brown-500 font-semibold'>Download the Shopfee App</span > and Become a <span className='text-brown-500 font-semibold'>Shopfee Member</span> to comfortably explore details of promotional programs exclusively for Shopfee members with attractive gifts.
                        </p>
                        <div className="mt-6 flex justify-center space-x-4">
                            <button onClick={openApp} className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white">
                                <img src={assets.images.app_store} alt="app store" />
                            </button>
                            <button onClick={openApp} className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white">
                                <img src={assets.images.google_play} alt="google play" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tricount;