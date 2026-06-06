const gray = "#bababa";
const orange = "#FFC95E";

// export function Star({color, size}) {
//     return (
//     <svg width={size ?? "24"} height={size ?? "24"} viewBox="0 0 1.92 1.92" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="iconify iconify--emojione">
//         <path d="M1.86.756h-.687L.96.09.747.756H.06l.555.411-.21.663.555-.411.555.411-.213-.666z" fill={color?? "#e4e5e9"}/>
//     </svg>
//     );
// }

export function Star({type="", size=24}) {
    return (
    <svg style={{width: size, height: size}} width="800" height="800" viewBox={`0 0 24 24`} xmlns="http://www.w3.org/2000/svg">
        <g fill="none">
            <path fill={type === "full" ? orange : gray} d="M12 16.8V2.4l2.4 7.2h8L16 14.4l3.2 8z"/>
            <path fill={(type === "half" || type === "full") ? orange : gray} d="m12 16.8-7.2 5.6 3.2-8-5.6-4.8h7.2L12 2.4z"/>
        </g>
    </svg>
    );
}