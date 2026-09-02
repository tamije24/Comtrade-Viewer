

import apiClient from "./api-client";
import { ComtradeFile } from "./comtrade-file-service";

export interface Project {
  project_id: number;
  project_name: string;
  afa_case_id: string;
  line_name: string;
  no_of_terminals: number;
  favorite: boolean;
  notes: string;
  user: number;
  files: ComtradeFile[];
}

export interface ProjectMin {
  afa_case_id: string;
  line_name: string;
  no_of_terminals: number;
  notes: string;
}

interface ChannelList {
  analog: string[][];
  digital: string[][];
}

export interface FileChannelInfo {
  file_id: number;
  ia: string;
  ib: string;
  ic: string;
  in: string;
  va: string;
  vb: string;
  vc: string;
  d1: string;
  d2: string;
  d3: string;
  d4: string;
  d5: string;
  d6: string;
  d7: string;
  d8: string;
  d9: string;
  d10: string;
  d11: string;
  d12: string;
}

class ProjectService {

    getAllProjects() {
        const controller = new AbortController();
        const endpoint = "/comtrade_reader/projects/";
        const request = apiClient.get<Project[]>(endpoint, {
        signal: controller.signal,
      })    
      return {request, cancel: ()=> controller.abort()}
    }

    getProject(id: number) {
      const endpoint = `/comtrade_reader/projects/${id}/`;
      return apiClient.get<Project>(endpoint)    
    }

    // getProjectbyAFAId(id: string) {
    //   const endpoint = `/comtrade_reader/projects/${id}/`;
    //   return apiClient.get<Project>(endpoint)    
    // }

    deleteProject(id: number) {
      const endpoint = `/comtrade_reader/projects/${id}/`; 
      return apiClient.delete(endpoint)
    }

    createProject(project: ProjectMin) {
      const endpoint = `/comtrade_reader/projects/`; 
      return apiClient.post(endpoint, project)
    }

    updateProject(project: Project) {
      const endpoint = `/comtrade_reader/projects/${project.project_id}/`; 
      return apiClient.put(endpoint, project)
    }

    getChannelList(project_id: number) {
      const endpoint = `/comtrade_reader/channels/${project_id}/`; 
      return apiClient.get<ChannelList>(endpoint)
    }

    updateChannelList(project_id: number, channels:FileChannelInfo[]) {
      const endpoint = `/comtrade_reader/update-channels/${project_id}/`; 
      return apiClient.put(endpoint, channels)
    }
}

export default new ProjectService();
