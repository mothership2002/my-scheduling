import React from 'react'

function flag(today) {
    if (today === null || today === undefined) {
        return (
            <span className="flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-300">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-25"></span>
                </span>
            </span>
        )
    }
    else {
        return (
            <span className="flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-300">
                </span>
            </span>
        )
    }
}

export function scheduleAlert(today) {
    return flag(today)
}
