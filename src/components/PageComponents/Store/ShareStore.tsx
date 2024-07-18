import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Checks, Copy } from '@phosphor-icons/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FacebookShareButton, FacebookIcon, EmailShareButton, EmailIcon } from 'react-share';

interface IShareStore {
    url: string
}

const ShareStore = (props: IShareStore) => {
    const [value, copy] = useCopyToClipboard();
    const [isCopySuccess, setIsCopySuccess] = useState<boolean>(false)
    const { t } = useTranslation();

    const copyToClipboard = async (url: string) => {
        await copy(url)
            .then(() => {
                console.log(value)
                setIsCopySuccess(true)
            })
            .catch(error => {
                console.error('Failed to copy!', error)
            })
    };

    const shareViaFacebook = (url: string) => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const shareViaEmail = (text: string, url: string) => {
        window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(
            `Check out this awesome website: ${url}`
        )}`;
    };

    return (
        <div className="flex flex-col items-center justify-center my-2 w-full">
            <p className="font-medium text-base">{t("Share")}</p>
            <div className="flex items-center justify-center w-full border-b py-2">
                <p className="max-w-[85%] break-all mr-1">{props?.url}</p>
                <button className="border rounded-2xl px-2 py-1 flex hover:bg-gray-50 hover:border-gray-300" onClick={() => copyToClipboard(props?.url)}>
                    {!isCopySuccess ? <Copy size={25} className="mr-1 text-blue-600" /> : <Checks size={25} className="mr-1 text-blue-600" />}<span>{t("Copy")}</span>
                </button>
            </div>
            <div className='mt-2'>
                <FacebookShareButton className='mx-2' url={props.url} onClick={() => shareViaFacebook(props.url)}>
                    <FacebookIcon size={40} round />
                </FacebookShareButton>
                <EmailShareButton url={props.url} subject={"Check out this great site!"} body={`Check out this awesome website: ${props.url}`} onClick={() => shareViaEmail(props.url, "Check out this great site!")}>
                    <EmailIcon size={40} round />
                </EmailShareButton>
            </div>
        </div>
    );
};

export default ShareStore;
