import * as React from 'react';

function SvgComponent({ stroke, fill, ...props }) {
  return (
    <svg
      width={15}
      height={16}
      viewBox="0 0 15 16"
      // fill="none"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.024 0a.55.55 0 01.523.381l.605 1.88c.254.124.497.263.729.42l1.93-.415a.55.55 0 01.592.264l1.523 2.637a.55.55 0 01-.069.644l-1.325 1.463c.02.28.02.561 0 .842l1.325 1.464a.55.55 0 01.07.644l-1.524 2.639a.55.55 0 01-.592.263l-1.93-.416c-.231.156-.475.297-.728.421l-.606 1.88a.55.55 0 01-.523.38H5.976a.55.55 0 01-.523-.38l-.604-1.879a6.044 6.044 0 01-.73-.423l-1.93.417a.55.55 0 01-.592-.264L.073 10.224a.55.55 0 01.07-.644l1.325-1.464c-.02-.28-.02-.56 0-.84L.143 5.81a.55.55 0 01-.07-.644L1.597 2.53a.55.55 0 01.592-.263l1.93.417c.232-.158.476-.3.73-.424L5.454.381A.55.55 0 015.975 0h3.048zM8.62 1.1H6.38l-.625 1.942-.421.206a5.05 5.05 0 00-.598.345l-.39.264-1.996-.431-1.121 1.943 1.369 1.515-.033.467c-.016.23-.016.46 0 .69l.033.466-1.371 1.515 1.122 1.944 1.997-.43.389.263c.191.128.39.244.598.345l.421.206.626 1.942h2.245l.626-1.944.42-.204c.207-.101.406-.216.597-.345l.388-.263 1.998.43 1.121-1.944-1.37-1.515.033-.466a5.05 5.05 0 000-.691l-.033-.467 1.371-1.514-1.122-1.943-1.998.429-.388-.262a4.938 4.938 0 00-.597-.345l-.42-.205L8.622 1.1zM7.5 4.397a3.298 3.298 0 110 6.596 3.298 3.298 0 010-6.596zm0 1.099a2.199 2.199 0 100 4.398 2.199 2.199 0 000-4.398z"
        fill={fill}
        // stroke={stroke}
      />
    </svg>
  );
}

export default SvgComponent;
