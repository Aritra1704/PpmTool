package io.arpaul.ppmtool.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.arpaul.ppmtool.domain.Project;
import io.arpaul.ppmtool.domain.User;
import io.arpaul.ppmtool.services.MapValidationErrorService;
import io.arpaul.ppmtool.services.UserService;
import io.arpaul.ppmtool.validator.UserValidator;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private MapValidationErrorService mapValidationErrorService;
	
	@Autowired
	private UserValidator userValidator;

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
		
		userValidator.validate(user, result);
		
		ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
		if(errorMap != null) return errorMap;
		
		User response = userService.createUser(user);
		return new ResponseEntity<User>(response, HttpStatus.CREATED);
	}
}
