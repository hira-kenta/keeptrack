import { useState } from "react";
import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";
import { Project } from "./Project";

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

    // プロジェクトを更新する。
    const saveProject = (project: Project) =>{
         let updatedProjects = projects.map((p: Project) =>{
            return p.id === project.id ? project : p;
         });

         setProjects(updatedProjects);
    };

    return(
        <>
            <h1>Projects</h1>
            {/* <pre>
                {JSON.stringify(MOCK_PROJECTS, null, ' ')}
            </pre> */}
            <ProjectList 
                onSave={saveProject}    
                projects={projects}
            />
        </>
    );
};

export default ProjectsPage;