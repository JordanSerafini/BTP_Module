interface TagProps {
    title: string;
    style: "border" | "full" | "default";
    theme: "green-900" | "blue-500" | "red-700" | string;
    css?: string; 
  }
  function Tag({ title, style, css = "", theme }: TagProps) {
    let styleAdd = "";
  
    switch (style) {
      case "border":
        styleAdd = `border-2 border-${theme} text-${theme} !important`;
        break;
      case "full":
        styleAdd = `bg-${theme} text-white !important`;
        break;
      default:
        styleAdd = `bg-${theme} !important`;
        break;
    }
  
    return (
      <div className={`font-bold rounded-full px-2 py-1 ${styleAdd} ${css}`}>
        {title}
      </div>
    );
  }
  
export default Tag;  