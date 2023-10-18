// import React, {Component} from "react";
// import IntrinsicAttributes = React.JSX.IntrinsicAttributes;
//
//
// export function withSuspense<WCP extends IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>){
//     return (props: WCP) => {
//         return <React.Suspense fallback={<div>Loading...</div>}>
//         <WrappedComponent {...props} />
//         </React.Suspense>
//     };
// }