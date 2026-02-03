"use client"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { TemplateFileTree } from "@/modules/playground/components/playground-explorer"
import { usePlayground } from "@/modules/playground/hooks/usePlayground"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { useParams } from "next/navigation"
import { useFileExplorer } from "@/modules/playground/hooks/useFileExplorer";



const MainPlaygroundpage = () =>{
    const {id} = useParams()

    const {playgroundData, templateData, isLoading, error, saveTemplateData} = usePlayground(id) //usePlayground(id)
      const {
    setTemplateData,
    setActiveFileId,
    setPlaygroundId,
    setOpenFiles,
    activeFileId,
    closeAllFiles,
    closeFile,
    openFile,
    openFiles,

    handleAddFile,
    handleAddFolder,
    handleDeleteFile,
    handleDeleteFolder,
    handleRenameFile,
    handleRenameFolder,
    updateFileContent
  } = useFileExplorer();
  const activeFile = openFiles.find((file) => file.id === activeFileId);
    console.log("temeplatedata",templateData);
    console.log("playgroundData",playgroundData);
    
    return(
        <TooltipProvider>
            <TemplateFileTree
            data={templateData!}
            onFileSelect={()=>{}}
            selectedFile={activeFile}
            title="File Explorer"
          onAddFile={()=>{}}
          onAddFolder={()=>{}}
          onDeleteFile={()=>{}}
          onDeleteFolder={()=>{}}
          onRenameFile={()=>{}}
          onRenameFolder={()=>{}}
            />
            <SidebarInset>
                <header className="flex h-16 shrink-0 item-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator orientation="vertical" className="mr-2 h-4"/>

                </header>

                <div className="flex flex-1 items-center gap-2">
                    <div className="flex flex-col flex-1">
                        <div className="text-sm font-medium">
                            {playgroundData?.title || "code playground"}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </TooltipProvider>
    )
}


export default MainPlaygroundpage