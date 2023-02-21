import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";

const ProjectsPage = () => {
    return(
        <>
            <h1>Projects</h1>
            {/* <pre>
                {JSON.stringify(MOCK_PROJECTS, null, ' ')}
            </pre> */}
            <ProjectList projects={MOCK_PROJECTS}/>
        </>
    );
};

export default ProjectsPage;