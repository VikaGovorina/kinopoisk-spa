import { useEffect, useState } from "react";

export interface TopLoaderProps {
    loading: boolean;
}

export default function TopLoader({ loading }: TopLoaderProps) {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | undefined;

        if (loading) {
            intervalId = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 90) {
                        return prevProgress;
                    }
                    return prevProgress + 10;
                }); 
            }, 20);
        } else {
            setProgress(100);

            setTimeout(() => {
                setProgress(0); 
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        }
    }, [loading]);

    return (
        <div
            style={{
                width: `${progress}%`,
                opacity: loading ? 1 : 0,
                transition: `width 0.2s linear, opacity 0.1s linear`,
                zIndex: 9999,
                background: 'linear-gradient(90deg, #ff3b3b, #FF0000)',
                height: '3px',
                position: 'fixed',
                top: '0',
                left: '0'
            } }
        ></div>
    );
}