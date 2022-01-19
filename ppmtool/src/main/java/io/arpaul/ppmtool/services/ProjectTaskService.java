package io.arpaul.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.arpaul.ppmtool.common.Constants;
import io.arpaul.ppmtool.domain.Backlog;
import io.arpaul.ppmtool.domain.ProjectTask;
import io.arpaul.ppmtool.repositories.BacklogRepository;
import io.arpaul.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	public ProjectTask insertProjectTask(String projectIdentifier, ProjectTask projectTask) {
		Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
		projectTask.setBacklog(backlog);
		Integer backlogSequence = backlog.getPTSequence();
		backlogSequence++;
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
}
