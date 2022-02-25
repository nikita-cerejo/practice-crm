import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import ProjectItem from "./project-item";

const ProjectList = (props) => {
  // console.log(props.projects);
  const { projects } = props;

  return (
    <>
      <Row xs={1} md={3} className="g-3 mt-2 mx-0">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            logo={project.logo}
            deleteHandler={props.onDeleteHandler}
          />
        ))}
      </Row>
    </>
  );
};

export default ProjectList;
