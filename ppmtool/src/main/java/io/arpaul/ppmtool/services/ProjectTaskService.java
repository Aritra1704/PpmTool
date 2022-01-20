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
	
	public ProjectTask insertProjectTask(String projectIdentifier, ProjectTask projectTask) {
		try {
			Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
			
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
		} catch (Exception ex) {// triggers bad request custom exception 
			throw new ProjectNotFoundException("Project ID '"+projectIdentifier.toUpperCase()+"' not found.");
		}
	}

	public Iterable<ProjectTask> findBacklogById(String id) {
		Project project = projectRepository.findByProjectIdentifier(id);
		if(project == null) {
			throw new ProjectNotFoundException("Project ID '"+id.toUpperCase()+"' not found.");	
		}
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
		
	}
}
