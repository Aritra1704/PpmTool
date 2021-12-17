package io.arpaul.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.arpaul.ppmtool.domain.Project;
import io.arpaul.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	public Project insertOrUpdateProject(Project project) {
		
		return projectRepository.save(project);
	}
}
