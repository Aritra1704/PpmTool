package io.arpaul.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import io.arpaul.ppmtool.domain.Backlog;
import io.arpaul.ppmtool.domain.User;
import io.arpaul.ppmtool.exceptions.ProjectIdException;
import io.arpaul.ppmtool.exceptions.UsernameExistsException;
import io.arpaul.ppmtool.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;// encrypt passwords
	
	public User createUser(User newUser) {
		try {
			User oldUser = userRepository.findByUsername(newUser.getUsername());
			if(oldUser != null) {// to validate if username already available
				throw new UsernameExistsException("User ID '"+newUser.getUsername()+"' already exists.");
			}
			newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
			newUser.setUsername(newUser.getUsername());
			newUser.setConfirmPassword("");
			return userRepository.save(newUser);	
		} catch (Exception e) {
			throw new UsernameExistsException("User ID '"+newUser.getUsername()+"' already exists.");
		}
	}
}
