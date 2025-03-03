const User = require('../models/user');
const Profile = require('../models/profile');
const { uploadImage } = require('../utils/cloudinary');
const MyWorks = require('../models/myWorks');
const Expertise = require('../models/expertise');
const Experience = require('../models/experience');
const Education = require('../models/education');
const Certificate = require('../models/certificate');
const Services = require('../models/services');
const sanitize = require('sanitize-html');
const Blog = require('../models/blog');

exports.profile = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) {
            return res.status(403).json({ message: 'Access denied, only logged-in user can access.' });
        }
        const { name, skills, bio, hackerRank, leetCode, codeChef, resume, github, email, linkedin, geeksforgeeks, aboutMe, data, experienceYears, completedProjects, clients, reviews, mobileNumber, whatsappNumber, telegram } = req.body;

        // const referenceYear = 2023;
        // const referenceMonth = 6;
        // const referenceDate = new Date(referenceYear, referenceMonth - 1);
        // const currentDate = new Date();

        // let experienceYears = currentDate.getFullYear() - referenceDate.getFullYear();
        // let experienceMonths = currentDate.getMonth() - referenceDate.getMonth();
        // if (experienceMonths < 0) {
        //     experienceYears--;
        //     experienceMonths += 12;
        // }

        let photo;
        if (req.file) {
            try {
                const [photoUrl] = await uploadImage(req.file);
                photo = photoUrl;
            } catch (error) {
                return res.status(500).json({ message: 'Failed to upload image.', error: error.message });
            }
        }

        if (skills) {
            var skillsArray = skills.split(',');
        }

        const profile = await Profile.findOne({ userId: loggedinuser._id });
        if (!profile) {
            const newProfile = new Profile({
                userId: loggedinuser._id,
                name,
                skills: skillsArray,
                bio,
                profilePhoto: photo,
                hackerRank,
                leetCode,
                codeChef,
                resume,
                github,
                email,
                linkedin,
                geeksforgeeks,
                aboutMe,
                data,
                experienceYears,
                // experienceMonths,
                completedProjects,
                clients,
                reviews,
                mobileNumber,
                whatsappNumber,
                telegram
            });
            await newProfile.save();
            return res.status(201).json({ message: "Profile created successfully", newProfile });
        }

        if (skills) {
            var skillsArray = skills.split(',');
        }
        else {
            var existingSkills = profile.skills;
        }

        profile.name = name || profile.name;
        profile.skills = skillsArray || existingSkills;
        profile.bio = bio || profile.bio;
        profile.profilePhoto = photo || profile.profilePhoto;
        profile.hackerRank = hackerRank || profile.hackerRank;
        profile.leetCode = leetCode || profile.leetCode;
        profile.codeChef = codeChef || profile.codeChef;
        profile.resume = resume || profile.resume;
        profile.github = github || profile.github;
        profile.email = email || profile.email;
        profile.linkedin = linkedin || profile.linkedin;
        profile.geeksforgeeks = geeksforgeeks || profile.geeksforgeeks;
        profile.aboutMe = aboutMe || profile.aboutMe;
        profile.data = data || profile.data;
        profile.experienceYears = experienceYears || profile.experienceYears;
        // profile.experienceMonths = experienceMonths || profile.experienceMonths;
        profile.completedProjects = completedProjects || profile.completedProjects;
        profile.clients = clients || profile.clients;
        profile.reviews = reviews || profile.reviews;
        profile.mobileNumber = mobileNumber || profile.mobileNumber;
        profile.whatsappNumber = whatsappNumber || profile.whatsappNumber;
        profile.telegram = telegram || profile.telegram;

        await profile.save();
        return res.status(200).json({ message: "Profile updated successfully", profile });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.find();
        if (!profile || !profile.length) { res.status(200).json({ message: "No profile found." }) }
        res.status(200).json({ profile })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.createWork = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) {
            return res.status(403).json({ message: 'Access denied, only logged-in user can access.' });
        }

        const { title, githubUrl, description, projectUrl, skills } = req.body;
        if (!title || !description || !projectUrl || !skills || !skills.length) {
            return res.status(400).json({ message: "Provide all the details to create work." })
        };

        let skillsArray = skills ? skills.split(',') : []

        let photo = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
        if (req.file) {
            try {
                const [photoUrl] = await uploadImage(req.file);
                photo = photoUrl;
            } catch (error) {
                return res.status(500).json({ message: 'Failed to upload image.', error: error.message });
            }
        };

        const work = new MyWorks({
            userId: loggedinuser._id, title, githubUrl, description, projectUrl, skills: skillsArray, image: photo
        });
        await work.save()
        res.status(201).json({ message: "Work created successfully.", work })

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.getWorks = async (req, res) => {
    try {
        const works = await MyWorks.find().sort({ createdAt: -1 });
        if (!works.length) { res.status(200).json({ message: "No works yet." }) }
        res.status(200).json({ works })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.editWork = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) {
            return res.status(403).json({ message: 'Access denied, only logged-in user can access.' });
        }
        const { workId } = req.params;
        if (!workId) { return res.status(400).json({ message: "Provide work id to edit." }) }

        const updatedData = req.body;

        const work = await MyWorks.findByIdAndUpdate(workId, updatedData, { new: true });
        if (!work) { res.status(200).json({ message: "No work found with the id." }) }

        let photo = work.image;
        if (req.file) {
            try {
                const [photoUrl] = await uploadImage(req.file);
                photo = photoUrl;
            } catch (error) {
                return res.status(500).json({ message: 'Failed to upload image.', error: error.message });
            }
        };

        work.image = photo;
        await work.save();

        res.status(200).json({ message: "Work updated successfully.", work })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.deleteWork = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) {
            return res.status(403).json({ message: 'Access denied, only logged-in user can access.' });
        }
        const { workId } = req.params;
        if (!workId) { return res.status(400).json({ message: "Provide work id to delete." }) }

        const work = await MyWorks.findOneAndDelete({ userId: loggedinuser._id, _id: workId });
        if (!work) { res.status(200).json({ message: "No work found with the id." }) }

        res.status(200).json({ message: "Work deleted successfully." })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.createExpertise = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) {
            return res.status(403).json({ message: 'Access denied, only logged-in users can access.' });
        }

        const { title, skills } = req.body;
        if (!title || !skills || !skills.length) {
            return res.status(400).json({ message: 'Provide all the details to create expertise.' });
        }

        const defaultIcon = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';

        const updatedSkills = await Promise.all(
            skills.map(async (skill) => {
                let icon = defaultIcon;

                const skillFile = req.files.find(file => file.fieldname === skill.title);

                if (skillFile) {
                    try {
                        const [iconUrl] = await uploadImage(skillFile);
                        icon = iconUrl;
                    } catch (error) {
                        return res.status(500).json({ message: 'Failed to upload image for one of the skills.', error: error.message });
                    }
                }
                return {
                    title: skill.title,
                    icon: icon,
                    percentage: skill.percentage,
                };
            })
        );

        const existingExpertise = await Expertise.findOne({ title, userId: loggedinuser._id });

        if (existingExpertise) {
            existingExpertise.skills.push(...updatedSkills);
            await existingExpertise.save();

            return res.status(200).json({ message: 'Expertise updated successfully', expertise: existingExpertise });
        } else {
            const expertise = new Expertise({
                userId: loggedinuser._id,
                title,
                skills: updatedSkills,
            });

            await expertise.save();

            res.status(201).json({ message: 'Expertise created successfully', expertise });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.getExpertises = async (req, res) => {
    try {
        const expertises = await Expertise.find();
        if (!expertises || !expertises.length) { res.status(200).json({ message: "No expertise yet." }) }
        res.status(200).json({ expertises })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.deleteExpertise = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) {
            return res.status(403).json({ message: 'Access denied, only logged-in user can access.' });
        }
        const { skillId } = req.params;
        if (!skillId) { return res.status(400).json({ message: "Provide skill id to delete." }) }

        const expertise = await Expertise.findOneAndUpdate(
            { userId: loggedinuser._id, 'skills._id': skillId },
            { $pull: { skills: { _id: skillId } } },
            { new: true }
        );
        if (!expertise) { return res.status(200).json({ message: "No expertise skill found with the id." }) }

        if (expertise.skills.length === 0) {
            await Expertise.deleteOne(expertise);
        }
        res.status(200).json({ message: "Expertise deleted successfully." })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.createExperience = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) { return res.status(403).json({ message: "Access denied, only logged-in user can access." }) }

        let { startYear, endYear, role, company, description } = req.body;
        if (!startYear || !role || !company || !description || !description.length) { return res.status(400).json({ message: "Provide all the details to add experience" }) }
        if (!endYear) { endYear = 'Present' }

        let logo = 'https://i.pinimg.com/736x/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg';
        if (req.file) {
            const [logoUrl] = await uploadImage(req.file)
            logo = logoUrl
        }

        const experience = new Experience({ userId: loggedinuser._id, startYear, endYear, role, company, logo: logo, description })
        await experience.save()
        res.status(201).json({ message: "Experience added successfully.", experience })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error.", error: err.message })
    }
};

exports.getExperience = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        if (!experiences || !experiences.length) { res.status(200).json({ message: "No work experiences yet." }) }
        res.status(200).json({ experiences })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.editExperience = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) {
            return res.status(403).json({ message: "Access denied, only logged-in user can access." });
        }

        const { experienceId } = req.params;
        if (!experienceId) {
            return res.status(400).json({ message: "Provide experience id to update." });
        }
        let updateData = req.body
        if (!updateData) { return res.status(400).json({ message: "Provide new data to update." }) }

        const experience = await Experience.findOneAndUpdate({ _id: experienceId, userId: loggedinuser._id }, updateData, { new: true });
        if (!experience) { return res.status(404).json({ message: "No experience found with the id." }) }

        let logo = experience.logo
        if (req.file) {
            let [logoUrl] = await uploadImage(req.file);
            logo = logoUrl
        }
        experience.logo = logo
        await experience.save()

        res.status(200).json({ message: "Experience updated successfully.", experience });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.createEducation = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) { return res.status(403).json({ message: "Access denied, only logged-in user can access." }) }

        let { study, college, description } = req.body;
        if (!study || !college || !description) { return res.status(400).json({ message: "Provide all the details to add education." }) }

        const education = new Education({ userId: loggedinuser._id, study, college, description })
        await education.save()
        res.status(201).json({ message: "Education added successfully.", education })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error.", error: err.message })
    }
};


exports.getEducation = async (req, res) => {
    try {
        const education = await Education.find().sort({ createdAt: -1 });
        if (!education || !education.length) { res.status(200).json({ message: "No educations yet." }) }
        res.status(200).json({ education })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.createCertificate = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) { return res.status(403).json({ message: "Access denied, only logged-in user can access." }) }

        let { title, issuedBy, year } = req.body;
        if (!title || !issuedBy || !year) { return res.status(400).json({ message: "Provide all the details to add education." }) }

        const certificate = new Certificate({ userId: loggedinuser._id, title, issuedBy, year })
        await certificate.save()
        res.status(201).json({ message: "Certificate created successfully.", certificate })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error.", error: err.message })
    }
};


exports.getCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.find().sort({ createdAt: -1 });
        if (!certificate || !certificate.length) { res.status(200).json({ message: "No Certificates yet." }) }
        res.status(200).json({ certificate })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.createOrEditServices = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) {
            return res.status(403).json({ message: 'Access denied, only logged-in user can access.' });
        }
        const { title, description1, description2, skills } = req.body;
        if (!title) { return res.status(400).json({ message: "Provide service title." }) }

        let photo;
        if (req.file) {
            try {
                const [photoUrl] = await uploadImage(req.file);
                photo = photoUrl;
            } catch (error) {
                return res.status(500).json({ message: 'Failed to upload image.', error: error.message });
            }
        }

        if (skills) {
            var skillsArray = skills.split(',');
        }

        const service = await Services.findOne({ userId: loggedinuser._id, title });
        if (!service) {
            const newService = new Services({
                userId: loggedinuser._id,
                title,
                skills: skillsArray,
                description1,
                description2,
                image: photo,
            });
            await newService.save();
            return res.status(201).json({ message: "Service created successfully", newService });
        }

        if (skills) {
            var skillsArray = skills.split(',');
        }
        else {
            var existingSkills = service.skills;
        }

        service.title = title;
        service.skills = skillsArray || existingSkills;
        service.description1 = description1 || service.description1;
        service.image = photo || service.image;
        service.description2 = description2 || service.description2;

        await service.save();
        return res.status(200).json({ message: "Service updated successfully.", service });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.getServices = async (req, res) => {
    try {
        const services = await Services.find().sort({ createdAt: -1 });
        if (!services || !services.length) { res.status(200).json({ message: "No services yet." }) }
        res.status(200).json({ services })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.createBlog = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) {
            return res.status(403).json({ message: 'Access denied, only logged-in user can access.' });
        }

        const { title, description } = req.body;
        if (!title || !description || !req.file) { return res.status(400).json({ message: "Proivde all the details to post blog." }) }

        let sanitizeDescription = sanitize(description);

        let photo;
        if (req.file) {
            try {
                const [photoUrl] = await uploadImage(req.file);
                photo = photoUrl;
            } catch (error) {
                return res.status(500).json({ message: 'Failed to upload image.', error: error.message });
            }
        }

        const blog = new Blog({
            userId:loggedinuser._id, title, description: sanitizeDescription, photo
        });
        await blog.save()
        res.status(201).json({ message: "Blog created successfully.", blog })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        if (!blogs || !blogs.length) { res.status(200).json({ message: "No blogss yet." }) }
        res.status(200).json({ blogs })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};


exports.deleteData = async (req, res) => {
    try {
        const loggedinuser = await User.findById(req.user && req.user.id);
        if (!loggedinuser) {
            return res.status(403).json({ message: 'Access denied, only logged-in user can access.' });
        }
        const { id } = req.params;
        if (!id) { return res.status(400).json({ message: "Provide id to delete." }) }

        const data = await Experience.findOneAndDelete({ _id: id, userId: loggedinuser._id }) || await Certificate.findOneAndDelete({ _id: id, userId: loggedinuser._id }) || await Education.findOneAndDelete({ _id: id, userId: loggedinuser._id }) || await Services.findOneAndDelete({ _id: id, userId: loggedinuser._id }) || await Blog.findOneAndDelete({ _id: id, userId: loggedinuser._id })
        if (!data) { return res.status(200).json({ message: "No data found with the id." }) }

        res.status(200).json({ message: "Data deleted successfully." })
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
};