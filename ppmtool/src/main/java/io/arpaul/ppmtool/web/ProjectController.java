package io.arpaul.ppmtool.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.arpaul.ppmtool.domain.Project;
import io.arpaul.ppmtool.models.request.CreateProjectRequest;
import io.arpaul.ppmtool.models.request.UpdateProjectRequest;
import io.arpaul.ppmtool.services.MapValidationErrorService;
import io.arpaul.ppmtool.services.ProjectService;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("")
	public ResponseEntity<?> createNewProject(@Valid @RequestBody CreateProjectRequest request, BindingResult result) {
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if(errorMap != null) return errorMap;
		
		Project project = new Project();
		project.setProjectName(request.getProjectName());
		project.setProjectIdentifier(request.getProjectIdentifier());
		project.setDescription(request.getDescription());
		
		project.setStart_date(request.getStart_date());
		project.setEnd_date(request.getEnd_date());
		
		project.setCreated_at(request.getCreated_at());
		project.setModified_at(request.getModified_at());
		Project response = projectService.insertProject(project);
		return new ResponseEntity<Project>(response, HttpStatus.OK);
	}
	
	@PutMapping("/{projectIdentifier}")
	public ResponseEntity<?> updateProject(
			@Valid @RequestBody UpdateProjectRequest request,  
			BindingResult result,
			@PathVariable String projectIdentifier) {
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if(errorMap != null) return errorMap;
		
		Project project = new Project();
		project.setProjectName(request.getProjectName());
		project.setProjectIdentifier(projectIdentifier);
		project.setDescription(request.getDescription());
		
		project.setStart_date(request.getStart_date());
		project.setEnd_date(request.getEnd_date());
		
		project.setCreated_at(request.getCreated_at());
		project.setModified_at(request.getModified_at());
		
		Project response = projectService.updateProject(project, projectIdentifier);
		return new ResponseEntity<Project>(response, HttpStatus.OK);
	}
	
	@GetMapping("/{projectIdentifier}")
	public ResponseEntity<?> getProjectByIDentifier(@PathVariable String projectIdentifier) {
		Project response = projectService.findByProjectIdentifier(projectIdentifier); 
		return new ResponseEntity<Project>(response, HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public Iterable<Project> getAllProjects() {
		return projectService.findAllProjects();
	}
	
	@DeleteMapping("/{projectIdentifier}")
	public ResponseEntity<?> deleteProject(@PathVariable String projectIdentifier) {
		projectService.deleProjectByIdentifier(projectIdentifier);
		return new ResponseEntity<String>("Project with ID '"+projectIdentifier+"' was deleted", HttpStatus.OK);
	}
}
