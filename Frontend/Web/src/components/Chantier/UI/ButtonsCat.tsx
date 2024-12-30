interface ButtonsCatProps {
    title: string;
    content: string;
    setSelectedChantier: (selectedChantier: string) => void;
    selectedChantier: string;
    }

function ButtonsCat({ title, content, setSelectedChantier, selectedChantier }: ButtonsCatProps) {
  return (
    <div 
    onClick={()=>setSelectedChantier(content)}
    className={`w-fit px-4 py-2 h-10 flex items-center justify-center cursor-pointer tracking-widest rounded-full ${content === selectedChantier ? "bg-gray-800 text-white " : "bg-gray-300 text-white"}`}
    >{title}</div>
  )
}

export default ButtonsCat