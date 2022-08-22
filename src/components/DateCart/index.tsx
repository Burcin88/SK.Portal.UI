import React from 'react';
declare var abp: any;

export default function DateCard({ date }) {
    return (
        <p className='step-time'>
            {date !== null && new Date(date)
                .toLocaleDateString(abp.localization.currentLanguage.name, {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                })}
        </p>
    )
}