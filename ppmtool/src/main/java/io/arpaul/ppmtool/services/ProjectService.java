package io.arpaul.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.arpaul.ppmtool.domain.Backlog;
import io.arpaul.ppmtool.domain.Project;
import io.arpaul.ppmtool.exceptions.ProjectIdException;
import io.arpaul.ppmtool.repositories.BacklogRepository;
import io.arpaul.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired BacklogRepository backlogRepository;
	
	public Project insertProject(Project project) {
		try {
			String identifier = project.getProjectIdentifier().toUpperCase();
			project.setProjectIdentifier(identifier);
			
			// to create a backlog only when a new project is created, and not while updating a project
			Backlog backlog = new Backlog();
			project.setBacklog(backlog);
			backlog.setProject(project);
			backlog.setProjectIdentifier(identifier);
			
			return projectRepository.save(project);	
		} catch (Exception e) {
			throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' already exists.");
		}
	}
	
	public Project updateProject(Project project, String projectIdentifier) {
		try {
			String identifier = project.getProjectIdentifier().toUpperCase();
			Project dbProject = projectRepository.findByProjectIdentifier(identifier);
			dbProject.setDescription(project.getDescription());
			dbProject.setProjectName(project.getProjectName());
			dbProject.setCreated_at(project.getCreated_at());
			dbProject.setModified_at(project.getModified_at());
			dbProject.setStart_date(project.getStart_date());
			dbProject.setEnd_date(project.getEnd_date());
			
			if(dbProject.getId() != null) {
				dbProject.setBacklog(backlogRepository.findByProjectIdentifier(identifier));
			}
			
			return projectRepository.save(dbProject);	
		} catch (Exception e) {
			throw new ProjectIdException("Project ID '"+projectIdentifier+"' already exists.");
		}
	}
	
	public Project findByProjectIdentifier(String projectIdentifier) {
		Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if(project == null) {
			throw new ProjectIdException("Project ID '"+projectIdentifier.toUpperCase()+"' doesn't exists.");
		}
		return project;
	}
	
	public Iterable<Project> findAllProjects() {
		return projectRepository.findAll();
	}
	
	public void deleProjectByIdentifier(String projectIdentifier) {
		Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if(project == null) {
			throw new ProjectIdException("Project ID '"+projectIdentifier.toUpperCase()+"' doesn't exists.");
		}
		projectRepository.delete(project);
	}
}
