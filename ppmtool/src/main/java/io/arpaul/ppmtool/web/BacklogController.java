package io.arpaul.ppmtool.web;

import java.security.Principal;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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
import io.arpaul.ppmtool.domain.ProjectTask;
import io.arpaul.ppmtool.services.MapValidationErrorService;
import io.arpaul.ppmtool.services.ProjectTaskService;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@PostMapping("/{backlog_id}")
	public ResponseEntity<?> insertProjectTaskToBacklog(
			@Valid @RequestBody ProjectTask projectTask,
			BindingResult result, 
			@PathVariable String backlog_id,
			Principal principal) {
		
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if(errorMap != null) return errorMap;
		
		ProjectTask response = projectTaskService.insertProjectTask(backlog_id, projectTask, principal.getName());
		return new ResponseEntity<ProjectTask>(response, HttpStatus.OK);
	}
	
	@GetMapping("/{backlog_id}")
	public ResponseEntity<Iterable<ProjectTask>> getProjectTaskBacklog(@PathVariable String backlog_id,
			Principal principal) {
		return new ResponseEntity<Iterable<ProjectTask>>(projectTaskService.findBacklogById(backlog_id, principal.getName()), HttpStatus.OK);
	}
	
	@GetMapping("/{backlog_id}/{projectTaskId}")
	public ResponseEntity<?> getProjectTaskByTaskId(@PathVariable String backlog_id, @PathVariable String projectTaskId,
			Principal principal) {
		ProjectTask projectTask = projectTaskService.findProjectTaskBySequence(backlog_id, projectTaskId, principal.getName());
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
	}
	
	@PutMapping("/{backlog_id}/{projectTaskId}")
	public ResponseEntity<?> updateProjectTaskByTaskId(
			@Valid @RequestBody ProjectTask projectTask,
			BindingResult result,
			@PathVariable String backlog_id, 
			@PathVariable String projectTaskId,
			Principal principal) {
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if(errorMap != null) return errorMap;
		
		ProjectTask updatedTask = projectTaskService.updateTaskByProjectSequence(projectTask, backlog_id, projectTaskId, principal.getName());
		
		return new ResponseEntity<ProjectTask>(updatedTask, HttpStatus.OK);
	}
	
	@DeleteMapping("/{backlog_id}/{projectTaskId}")
	public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String projectTaskId,
			Principal principal) {
		projectTaskService.deleteProjectTaskByProjectSequence(backlog_id, projectTaskId, principal.getName());
		
		return new ResponseEntity<String>("Project Task "+projectTaskId+" was deleted successfully", HttpStatus.OK);
	}
}
