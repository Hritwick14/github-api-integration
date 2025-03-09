const express = require("express")
const axios = require("axios")

const router = express.Router()

const user = "USERNAME"
const token = "GENERATED_TOKEN"

router.get("/", async (req, res) => {
    console.log("getting my github details");

    let followersData = null
    let followingData = null
    let reposData = null

    const followersApiUrl = `https://api.github.com/users/${user}/followers`;
    const followingApiUrl = `https://api.github.com/users/${user}/following`;
    const reposApiUrl = `https://api.github.com/users/${user}/repos`;

    try {
        const response = await axios.get(followersApiUrl);
        followersData = response.data;
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
                message: `Error fetching GitHub repository: ${error.response.statusText}`,
                details: error.response.data,
            });
        } else if (error.request) {
            res.status(500).json({ message: 'No response received from GitHub API' });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
        }
    }

    try {
        const response = await axios.get(followingApiUrl);
        followingData = response.data;
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
                message: `Error fetching GitHub repository: ${error.response.statusText}`,
                details: error.response.data,
            });
        } else if (error.request) {
            res.status(500).json({ message: 'No response received from GitHub API' });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
        }
    }

    try {
        const response = await axios.get(reposApiUrl);
        reposData = response.data;
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
                message: `Error fetching GitHub repository: ${error.response.statusText}`,
                details: error.response.data,
            });
        } else if (error.request) {
            res.status(500).json({ message: 'No response received from GitHub API' });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
        }
    }

    let result = {
        repositories: {
            no_of_repositories: reposData.length,
            repositories_data: reposData
        },
        followers_data: {
            no_of_followers: followersData.length,
            followers_data: followersData
        },
        following_data: {
            no_of_following: followingData.length,
            following_data: followingData
        }
    }

    res.send(result)
})

router.get("/:repoName/", async (req, res) => {
    console.log("getting my github repository details");

    const repoName = req.params.repoName;
    const apiUrl = `https://api.github.com/repos/${user}/${repoName}`;

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
                message: `Error fetching GitHub repository: ${error.response.statusText}`,
                details: error.response.data,
            });
        } else if (error.request) {
            res.status(500).json({ message: 'No response received from GitHub API' });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
        }
    }
})

router.post("/:repoName/issues/", async(req, res) => {
    console.log("creating an issue in my github repository");

    const {title, body} = req.body 
    const repoName = req.params.repoName;
    
    const apiUrl = `https://api.github.com/repos/${user}/${repoName}/issues`;

    try {
        const response = await axios.post(apiUrl, {
            title: title,
            body: body,
        }, {
            headers: {
                "Authorization": `token ${token}`,
                "Content-Type": "application/json"
            }
        });

        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
                message: `Error fetching GitHub repository: ${error.response.statusText}`,
                details: error.response.data,
            });
        } else if (error.request) {
            res.status(500).json({ message: 'No response received from GitHub API' });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred', error: error.message });
        }
    }
})

module.exports = router