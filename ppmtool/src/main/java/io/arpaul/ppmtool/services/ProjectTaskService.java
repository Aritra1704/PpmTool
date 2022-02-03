package io.arpaul.ppmtool.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.arpaul.ppmtool.common.Constants;
import io.arpaul.ppmtool.domain.Backlog;
import io.arpaul.ppmtool.domain.Project;
import io.arpaul.ppmtool.domain.ProjectTask;
import io.arpaul.ppmtool.exceptions.ProjectIdException;
import io.arpaul.ppmtool.exceptions.ProjectNotFoundException;
import io.arpaul.ppmtool.repositories.BacklogRepository;
import io.arpaul.ppmtool.repositories.ProjectRepository;
import io.arpaul.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private ProjectService projectService;
	
	public ProjectTask insertProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {
		
		Backlog backlog = projectService.findByProjectIdentifier(projectIdentifier, username).getBacklog();
		if(backlog == null) {
			throw new ProjectNotFoundException("Project ID '"+projectIdentifier.toUpperCase()+"' not found.");
		}
		
		projectTask.setBacklog(backlog);
		Integer backlogSequence = backlog.getPTSequence();
		backlogSequence++;
		backlog.setPTSequence(backlogSequence);
		projectTask.setProjectSequence(projectIdentifier+"-"+backlogSequence);
		projectTask.setProjectIdentifier(projectIdentifier);
		// PRIORITY 1: High 2: Medium 3: Low
		if(projectTask.getPriority() == null || projectTask.getPriority() == Constants.ProjectTaskPriority.NONE) {
			projectTask.setPriority(Constants.ProjectTaskPriority.LOW);	
		}
		if(projectTask.getStatus() == null || projectTask.getStatus() == "") {
			projectTask.setStatus(Constants.ProjectTaskStatus.TO_DO);
		}
		
		return projectTaskRepository.save(projectTask);
	}

	public Iterable<ProjectTask> findBacklogById(String id, String username) {
		Project project = projectService.findByProjectIdentifier(id, username);
		if(project == null) {
			throw new ProjectNotFoundException("Project ID '"+id.toUpperCase()+"' not found.");	
		}
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
		
	}
	
	public ProjectTask findProjectTaskBySequence(String backlog_id, String projectTaskId, String username) {
		Backlog backlog = projectService.findByProjectIdentifier(backlog_id, username).getBacklog();
		
		if(backlog == null) { // Checks if project exists
			throw new ProjectNotFoundException("Project with ID '"+backlog_id.toUpperCase()+"' does not exists.");
		}
		
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectTaskId);
		if(projectTask == null) { // Checks if project task exists
			throw new ProjectNotFoundException("Project Task '"+projectTaskId.toUpperCase()+"' does not exists.");
		}
		
		if(!projectTask.getProjectIdentifier().equalsIgnoreCase(backlog_id)) { // Checks if project task belongs to respective project
			throw new ProjectNotFoundException("Project Task '"+projectTaskId.toUpperCase()+"' does not exists in project: '"+backlog_id+"'.");
		}
		
		return projectTask;
	}
	
	public ProjectTask updateTaskByProjectSequence(ProjectTask updatedTask, String backlog_id, String projectTaskId, String username) {
		ProjectTask projectTask = findProjectTaskBySequence(backlog_id, projectTaskId, username);
		
		projectTask = updatedTask;
		
		return projectTaskRepository.save(projectTask);
	}
	
	public void deleteProjectTaskByProjectSequence(String backlog_id, String projectTaskId, String username) {
		ProjectTask projectTask = findProjectTaskBySequence(backlog_id, projectTaskId, username);
		
		projectTaskRepository.delete(projectTask);
	}
}
