package io.arpaul.ppmtool.payload.requests;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

public class UpdateProjectRequest {
	@NotBlank(message = "Project name is required")
	private String projectName;
	@NotBlank(message = "Project description is required")
	private String description;
	@JsonFormat(pattern = "yy-mm-dd")
	private Date start_date;
	@JsonFormat(pattern = "yy-mm-dd")
	private Date end_date;
	@JsonFormat(pattern = "yy-mm-dd")
	@Column(updatable = false)
	private Date created_at;
	@JsonFormat(pattern = "yy-mm-dd")
	private Date modified_at;
	
	public UpdateProjectRequest() {
		super();
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getStart_date() {
		return start_date;
	}

	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}

	public Date getEnd_date() {
		return end_date;
	}

	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public Date getModified_at() {
		return modified_at;
	}

	public void setModified_at(Date modified_at) {
		this.modified_at = modified_at;
	}

	@Override
	public String toString() {
		return "UpdateProjectRequest [projectName=" + projectName
				+ ", description=" + description + ", start_date=" + start_date + ", end_date=" + end_date
				+ ", created_at=" + created_at + ", modified_at=" + modified_at + "]";
	}
}
