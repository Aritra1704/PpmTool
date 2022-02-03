package io.arpaul.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.arpaul.ppmtool.domain.Backlog;
import io.arpaul.ppmtool.domain.Project;
import io.arpaul.ppmtool.domain.User;
import io.arpaul.ppmtool.exceptions.ProjectIdException;
import io.arpaul.ppmtool.exceptions.ProjectNotFoundException;
import io.arpaul.ppmtool.repositories.BacklogRepository;
import io.arpaul.ppmtool.repositories.ProjectRepository;
import io.arpaul.ppmtool.repositories.UserRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired 
	private BacklogRepository backlogRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public Project insertProject(Project project, String username) {
		try {
			String identifier = project.getProjectIdentifier().toUpperCase();
			
			User user = userRepository.findByUsername(username);
			project.setUser(user);
			project.setProjectLeader(user.getUsername());
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
	
	public Project updateProject(Project project, String projectIdentifier, String username) {
		try {
			String identifier = project.getProjectIdentifier().toUpperCase();
			Project dbProject = findByProjectIdentifier(identifier, username);
			if(dbProject != null) {
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
			} else {
				throw new ProjectIdException("Project ID '"+projectIdentifier.toUpperCase()+"' doesn't exists.");
			}
		} catch (Exception e) {
			throw new ProjectIdException("Project ID '"+projectIdentifier+"' already exists.");
		}
	}
	
	public Project findByProjectIdentifier(String projectIdentifier, String username) {
		Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if(project == null) {
			throw new ProjectIdException("Project ID '"+projectIdentifier.toUpperCase()+"' doesn't exists.");
		} else if(!project.getProjectLeader().equals(username)) {// to validate if project belongs to the current user
			throw new ProjectNotFoundException("Project not found in your account.");
		} else {
			return project;	
		}
	}
	
	public Iterable<Project> findAllProjects(String username) {
		return projectRepository.findAllByProjectLeader(username);
	}
	
	public void deleProjectByIdentifier(String projectIdentifier, String username) {
		projectRepository.delete(findByProjectIdentifier(projectIdentifier, username));
	}
}
