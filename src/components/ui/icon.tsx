import type React from "react";

interface IconProps {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
  className?: string;
}

const Check: React.FC<IconProps> = ({
  fill = "currentColor",
  strokewidth = 1,
  title = "check",
  className,
}) => {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M6.75,15h-.002c-.227,0-.442-.104-.583-.281L2.165,9.719c-.259-.324-.207-.795,.117-1.054,.325-.259,.796-.206,1.054,.117l3.418,4.272L14.667,3.278c.261-.322,.732-.373,1.055-.111,.322,.261,.372,.733,.111,1.055L7.333,14.722c-.143,.176-.357,.278-.583,.278Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

const ChevronLeft: React.FC<IconProps> = ({
  fill = "currentColor",
  strokewidth = 1,
  title = "chevron-left",
  className,
}) => {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M11.5,16c-.192,0-.384-.073-.53-.22l-6.25-6.25c-.293-.293-.293-.768,0-1.061L10.97,2.22c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061l-5.72,5.72,5.72,5.72c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

const ChevronRight: React.FC<IconProps> = ({
  fill = "currentColor",
  strokewidth = 1,
  title = "chevron-right",
  className,
}) => {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M13.28,8.47L7.03,2.22c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l5.72,5.72-5.72,5.72c-.293,.293-.293,.768,0,1.061,.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l6.25-6.25c.293-.293,.293-.768,0-1.061Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

const Circle: React.FC<IconProps> = ({
  fill = "currentColor",
  strokewidth = 1,
  title = "circle",
  className,
}) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      stroke={fill}
      strokeWidth={strokewidth}
      className={className}
    >
      <title>{title}</title>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};

const DarkLight: React.FC<IconProps> = ({
  fill = "currentColor",
  secondaryfill,
  strokewidth = 1,
  title = "dark-light",
  className,
}) => {
  const secondaryFillColor = secondaryfill || fill;

  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokewidth}
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M9,12V6c-1.657,0-3,1.343-3,3s1.343,3,3,3Z"
          fill={secondaryFillColor}
        />
        <path
          d="M9,6c1.657,0,3,1.343,3,3s-1.343,3-3,3v4.25c4.004,0,7.25-3.246,7.25-7.25S13.004,1.75,9,1.75V6Z"
          fill={secondaryFillColor}
        />
        <path
          d="M9,1c4.411,0,8,3.589,8,8s-3.589,8-8,8S1,13.411,1,9,4.589,1,9,1Zm0,14.5c3.584,0,6.5-2.916,6.5-6.5s-2.916-6.5-6.5-6.5S2.5,5.416,2.5,9s2.916,6.5,6.5,6.5Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

const Gear: React.FC<IconProps> = ({
  fill = "currentColor",
  secondaryfill,
  strokewidth = 1,
  title = "gear",
  className,
}) => {
  const secondaryFillColor = secondaryfill || fill;

  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokewidth}
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M14.5,8.25h-5.067L6.899,3.862c-.207-.359-.667-.481-1.024-.274-.359,.207-.481,.666-.274,1.024l2.534,4.388-2.534,4.389c-.207,.359-.084,.817,.274,1.024,.118,.068,.247,.101,.375,.101,.259,0,.511-.134,.65-.375l2.534-4.389h5.067c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z"
          fill={secondaryFillColor}
        />
        <path
          d="M16.25,8.25h-1.049c-.072-.597-.225-1.169-.453-1.702l.906-.523c.359-.207,.481-.666,.274-1.024-.207-.359-.666-.481-1.024-.274l-.913,.527c-.354-.471-.773-.889-1.243-1.243l.527-.914c.207-.359,.084-.817-.274-1.024-.358-.208-.817-.085-1.024,.274l-.523,.906c-.533-.229-1.105-.381-1.702-.453V1.75c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v1.049c-.597,.072-1.169,.225-1.702,.453l-.523-.906c-.208-.359-.667-.482-1.024-.274-.359,.207-.481,.666-.274,1.024l.527,.914c-.471,.354-.889,.772-1.243,1.243l-.913-.527c-.357-.207-.817-.085-1.024,.274-.207,.359-.084,.817,.274,1.024l.906,.523c-.228,.533-.381,1.105-.453,1.702H1.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1.049c.072,.597,.225,1.169,.453,1.702l-.906,.523c-.359,.207-.481,.666-.274,1.024,.139,.241,.391,.375,.65,.375,.127,0,.256-.032,.375-.101l.913-.527c.354,.471,.773,.889,1.243,1.243l-.527,.914c-.207,.359-.084,.817,.274,1.024,.118,.068,.247,.101,.375,.101,.259,0,.511-.134,.65-.375l.523-.906c.533,.229,1.105,.381,1.702,.453v1.049c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-1.049c.597-.072,1.169-.225,1.702-.453l.523,.906c.139,.241,.391,.375,.65,.375,.127,0,.256-.032,.375-.101,.359-.207,.481-.666,.274-1.024l-.527-.914c.471-.354,.889-.772,1.243-1.243l.913,.527c.118,.068,.247,.101,.375,.101,.259,0,.511-.134,.65-.375,.207-.359,.084-.817-.274-1.024l-.906-.523c.228-.533,.381-1.105,.453-1.702h1.049c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Zm-7.25,5.5c-2.619,0-4.75-2.131-4.75-4.75s2.131-4.75,4.75-4.75,4.75,2.131,4.75,4.75-2.131,4.75-4.75,4.75Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

const GridCirclePlus: React.FC<IconProps> = ({
  fill = "currentColor",
  secondaryfill,
  strokewidth = 1,
  title = "grid-circle-plus",
  className,
}) => {
  const secondaryFillColor = secondaryfill || fill;

  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokewidth}
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M15.5,12h-1.75v-1.75c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v1.75h-1.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1.75v1.75c0,.414,.336,.75,.75,.75s.75-.336,.75-.75v-1.75h1.75c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z"
          fill={secondaryFillColor}
        />
        <circle cx="5" cy="5" fill={fill} r="3.25" />
        <circle cx="13" cy="5" fill={fill} r="3.25" />
        <circle cx="5" cy="13" fill={fill} r="3.25" />
      </g>
    </svg>
  );
};

const Plus: React.FC<IconProps> = ({
  fill = "currentColor",
  secondaryfill,
  strokewidth = 1,
  title = "plus",
  className,
}) => {
  const secondaryFillColor = secondaryfill || fill;

  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokewidth}
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M14.75,9.75H3.25c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75H14.75c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"
          fill={secondaryFillColor}
        />
        <path
          d="M9,15.5c-.414,0-.75-.336-.75-.75V3.25c0-.414,.336-.75,.75-.75s.75,.336,.75,.75V14.75c0,.414-.336,.75-.75,.75Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

const Minus: React.FC<IconProps> = ({
  fill = "currentColor",
  strokewidth = 1,
  title = "minus",
  className,
}) => {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokewidth}
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M14.75,9.75H3.25c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75H14.75c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

const SquareMinus: React.FC<IconProps> = ({
  fill = "currentColor",
  strokewidth = 1,
  title = "square-minus",
  className,
}) => {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokewidth}
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M13.25,2H4.75c-1.517,0-2.75,1.233-2.75,2.75V13.25c0,1.517,1.233,2.75,2.75,2.75H13.25c1.517,0,2.75-1.233,2.75-2.75V4.75c0-1.517-1.233-2.75-2.75-2.75Zm-1,7.75H5.75c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h6.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

const SquarePlus: React.FC<IconProps> = ({
  fill = "currentColor",
  strokewidth = 1,
  title = "square-plus",
  className,
}) => {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokewidth}
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M13.25,2H4.75c-1.517,0-2.75,1.233-2.75,2.75V13.25c0,1.517,1.233,2.75,2.75,2.75H13.25c1.517,0,2.75-1.233,2.75-2.75V4.75c0-1.517-1.233-2.75-2.75-2.75Zm-1,7.75h-2.5v2.5c0,.414-.336,.75-.75,.75s-.75-.336-.75-.75v-2.5h-2.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h2.5v-2.5c0-.414,.336-.75,.75-.75s.75,.336,.75,.75v2.5h2.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

const Xmark: React.FC<IconProps> = ({
  fill = "currentColor",
  secondaryfill,
  strokewidth = 1,
  title = "xmark",
  className,
}) => {
  const secondaryFillColor = secondaryfill || fill;

  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokewidth}
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M4,14.75c-.192,0-.384-.073-.53-.22-.293-.293-.293-.768,0-1.061L13.47,3.47c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061L4.53,14.53c-.146,.146-.338,.22-.53,.22Z"
          fill={secondaryFillColor}
        />
        <path
          d="M14,14.75c-.192,0-.384-.073-.53-.22L3.47,4.53c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0L14.53,13.47c.293,.293,.293,.768,0,1.061-.146,.146-.338,.22-.53,.22Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

const Tasks: React.FC<IconProps> = ({
  fill = "currentColor",
  secondaryfill,
  strokewidth = 1,
  title = "tasks",
  className,
}) => {
  const secondaryFillColor = secondaryfill || fill;

  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokewidth}
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M14.25,4.5H7.25c-1.517,0-2.75,1.233-2.75,2.75v7c0,1.517,1.233,2.75,2.75,2.75h7c1.517,0,2.75-1.233,2.75-2.75V7.25c0-1.517-1.233-2.75-2.75-2.75Zm-.398,4.452l-3.397,4.5c-.128,.169-.322,.276-.534,.295-.021,.002-.043,.003-.065,.003-.189,0-.372-.071-.511-.201l-1.609-1.5c-.303-.283-.32-.757-.038-1.06,.283-.303,.758-.32,1.06-.038l1.001,.933,2.896-3.836c.25-.33,.719-.395,1.051-.146,.331,.25,.396,.72,.146,1.051Z"
          fill={fill}
        />
        <path
          d="M2.8,12.748c-.365,0-.686-.268-.741-.64L1.03,5.184c-.223-1.5,.815-2.901,2.315-3.125l6.924-1.029c1.269-.186,2.478,.507,2.954,1.689,.155,.384-.031,.821-.415,.976-.388,.155-.822-.031-.976-.415-.217-.537-.769-.852-1.343-.767L3.566,3.543c-.682,.102-1.154,.739-1.053,1.42l1.029,6.924c.061,.41-.222,.792-.631,.852-.038,.006-.075,.008-.111,.008Z"
          fill={secondaryFillColor}
        />
      </g>
    </svg>
  );
};

const Trash: React.FC<IconProps> = ({
  fill = "currentColor",
  secondaryfill,
  strokewidth = 1,
  title = "trash",
  className,
}) => {
  const secondaryFillColor = secondaryfill || fill;

  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokewidth}
      className={className}
    >
      <title>{title}</title>
      <g fill={fill}>
        <path
          d="M15.25,3.5h-3.25v-.75c0-.965-.785-1.75-1.75-1.75h-2.5c-.965,0-1.75,.785-1.75,1.75v.75H2.75c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75H15.25c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Zm-7.75-.75c0-.138,.112-.25,.25-.25h2.5c.138,0,.25,.112,.25,.25v.75h-3v-.75Z"
          fill={secondaryFillColor}
        />
        <path
          d="M13.5,6H4.5c-.206,0-.402,.084-.544,.234s-.216,.35-.205,.556l.4,7.604c.077,1.461,1.283,2.606,2.746,2.606h4.205c1.463,0,2.669-1.145,2.746-2.605l.4-7.605c.011-.206-.063-.406-.205-.556s-.338-.234-.544-.234Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export {
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  DarkLight,
  Gear,
  GridCirclePlus,
  Minus,
  Plus,
  SquareMinus,
  SquarePlus,
  Xmark,
  Tasks,
  Trash,
};
